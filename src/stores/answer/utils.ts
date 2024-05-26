import { useLocalStorage } from '@vueuse/core';
import { useAnswerStore } from '.';
import type { AnswerItem, ApiResSurvey, QuestionItem } from './types';

/** 生成唯一 id，暂时使用随机数生成 */
function uuid() {
    return Math.random().toString().substring(2);
}
function convertToNewQuestionList(data: QuestionItem[]): QuestionItem[] {
    const res: QuestionItem[] = [];
    data.forEach((item) => {
        if (item.type === 'matrix_single_select' || item.type === 'matrix_multi_select') {
            const type2 = item.type.substring(7) as 'single_select' || 'multi_select'
            // 标题和描述转换为 desc 问题类型
            const desc: QuestionItem = {
                id: uuid(),
                title: item.title + '\n\n' + item.desc,
                type: 'desc',
                desc: '',
                options: [],
                titles: [],
                order: 0,
                required: item.required,
            };
            res.push(desc);
            // 所有子问题重新转换为单选或多选
            item.titles.forEach(({ text: title }) => {
                const q: QuestionItem = {
                    id: uuid(),
                    title,
                    type: type2,
                    desc: '',
                    options: item.options,
                    titles: [],
                    order: 0,
                    required: item.required,
                };
                res.push(q);
            });
        } else {
            res.push(item);
        }
    });

    // 最后，需要重新生成问题的 order
    res.forEach((item, i) => {
        item.order = i;
    });
    return res;
}
export function getSurveySuccessCallback(data: ApiResSurvey, surveyId: number) {
    // TODO: 目前是临时抱佛脚方案——将矩阵单选和矩阵多选转换为单选和多选
    const oldQuestionList = data.structure_json.questionList;
    const newQuestionList = convertToNewQuestionList(oldQuestionList);
    data.structure_json.questionList = newQuestionList;

    useAnswerStore().startTime = new Date().getTime();
    useAnswerStore().survey.title = data.title;
    useAnswerStore().survey.comment = data.comment;
    useAnswerStore().survey.questionList = data.structure_json.questionList;

    // @ts-ignore 获取本地缓存问卷
    useAnswerStore().answer.data = useLocalStorage<AnswerItem[]>(
        `answer-data-${surveyId}`,
        getBasicQuestionTemplate(newQuestionList),
    );

    useAnswerStore().recheckValid();
}
export function getBasicQuestionTemplate(questionList: QuestionItem[]): AnswerItem[] {
    const res: AnswerItem[] = [];
    questionList.forEach((question, index) => {
        res.push({
            type: question.type,
            id: question.id,
            required: question.required,
            text: '',
            option_text: [],
        });
    });
    return res;
}
