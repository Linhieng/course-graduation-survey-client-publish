import { get, post } from './axios';
import type { ApiResSurvey, ReqSurveyAnswer } from '@/stores/answer/types';

export function apiAnswerGetSurvey(surveyId: number) {
    return get<ApiResSurvey>('/api/answer/' + surveyId);
}

export function apiAnswerPost(surveyId: number, data: ReqSurveyAnswer) {
    return post('/api/answer/' + surveyId, data);
}
