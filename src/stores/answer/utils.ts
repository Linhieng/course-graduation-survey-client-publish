import { useAnswerStore } from '.';
import type { AnswerItem, ApiResSurvey, QuestionItem } from './types';

export function getSurveySuccessCallback(data: ApiResSurvey) {
    useAnswerStore().survey.title = data.title;
    useAnswerStore().survey.comment = data.comment;
    useAnswerStore().survey.questionList = data.structure_json.questionList;

    fillBasicQuestionTemplate(data.structure_json.questionList);
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
function fillBasicQuestionTemplate(questionList: QuestionItem[]) {
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
