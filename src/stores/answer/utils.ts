import { useAnswerStore } from '.';
import type { ApiResSurvey } from './types';

export function getSurveySuccessCallback(data: ApiResSurvey) {
    useAnswerStore().survey.title = data.title;
    useAnswerStore().survey.comment = data.comment;
    useAnswerStore().survey.questionList = data.structure_json.questionList;
}
