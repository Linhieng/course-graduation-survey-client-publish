import { useLocalStorage } from '@vueuse/core';
import { useAnswerStore } from '.';
import type { AnswerItem, ApiResSurvey, QuestionItem } from './types';

export function getSurveySuccessCallback(data: ApiResSurvey, surveyId: number) {
    useAnswerStore().survey.title = data.title;
    useAnswerStore().survey.comment = data.comment;
    useAnswerStore().survey.questionList = data.structure_json.questionList;

    // @ts-ignore
    useAnswerStore().answer.data = useLocalStorage<AnswerItem[]>(
        `answer-data-${surveyId}`,
        getBasicQuestionTemplate(data.structure_json.questionList),
    );

    fillValid(data.structure_json.questionList);
}
// 对每个问题进行校验
function fillValid(questionList: QuestionItem[]) {
    questionList.forEach((q, i) => {
        if (q.type === 'desc') {
            useAnswerStore().local.validForEveryQuestion[i] = true;
        } else if (!q.required) {
            useAnswerStore().local.validForEveryQuestion[i] = true;
        } else {
            useAnswerStore().local.validForEveryQuestion[i] = false;
        }
    });
}

/** 得到问卷后，根据问题类型，初始化对应问题的初始值 */
export function fillBasicQuestionTemplate(questionList: QuestionItem[]) {
    questionList.forEach((question, index) => {
        // 全部写成一个对象就可以了
        useAnswerStore().answer.data[index] = {
            type: question.type,
            id: question.id,
            text: '',
            option_text: [],
        };
    });
}
/** 得到问卷后，根据问题类型，初始化对应问题的初始值 */
export function getBasicQuestionTemplate(questionList: QuestionItem[]): AnswerItem[] {
    const res: AnswerItem[] = [];
    questionList.forEach((question, index) => {
        res.push({
            type: question.type,
            id: question.id,
            text: '',
            option_text: [],
        });
    });
    return res;
}
