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
