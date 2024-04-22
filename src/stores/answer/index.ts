import { defineStore } from 'pinia';
import type { AnswerStore } from './types';
import { apiAnswerGetSurvey, apiAnswerPost } from '@/api/answer';
import { msgError, msgSuccess, msgWarning } from '@/utils/msg';
import { getSurveySuccessCallback } from './utils';
import router from '@/router';
import { useLocalStorage } from '@vueuse/core';

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
            validForEveryQuestion: [],
            isFetching: false,
            isPushing: false,
            hasSubmit: useLocalStorage('has-submit', false),
        },
    }),
    actions: {
        checkValid() {
            const firstUnValid = this.local.validForEveryQuestion.indexOf(false);

            if (firstUnValid === -1) {
                return true;
            }

            msgWarning(`第 ${firstUnValid + 1} 题还未填写`);
        },
        /** 提交问卷 */
        async submitAnswer() {
            if (!this.survey.id) return;

            if (this.local.isPushing) return;
            // 校验
            if (!this.checkValid()) {
                return;
            }

            this.local.isPushing = true;
            const res = await apiAnswerPost(this.survey.id, {
                surveyId: this.survey.id,
                answerStructureJson: this.answer,
            });
            if (res.ok) {
                msgSuccess('已提交');
                this.local.hasSubmit = true;
            } else {
                msgError(res.msg);
            }
            this.local.isPushing = false;
        },

        /** 获取一份问卷 */
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
