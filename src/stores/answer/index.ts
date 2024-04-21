import { defineStore } from 'pinia';
import type { AnswerStore } from './types';
import { apiAnswerGetSurvey } from '@/api/answer';
import { msgError } from '@/utils/msg';
import { getSurveySuccessCallback } from './utils';
import router from '@/router';

export const useAnswerStore = defineStore('answer', {
    state: (): AnswerStore => ({
        answer: {
            data: [],
        },
        survey: {
            id: undefined,
            comment: '',
            title: '',
            questionList: [],
        },
        local: {
            isFetching: false,
            isPushing: false,
        },
    }),
    actions: {
        async getSurvey(id: number) {
            if (isNaN(id)) {
                msgError('问卷不存在');
                router.push({ name: 'not-found' });
                return;
            }
            this.survey.id = id;
            if (this.local.isFetching) return;
            this.local.isFetching = true;
            const res = await apiAnswerGetSurvey(id);
            if (!res.ok) {
                msgError(res.msg);
                router.push({ name: 'not-found' });
            } else {
                getSurveySuccessCallback(res.data);
            }
            this.local.isFetching = false;
        },
    },
});
