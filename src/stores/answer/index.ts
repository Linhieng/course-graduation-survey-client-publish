import { defineStore } from 'pinia';
import type { AnswerItem, AnswerStore } from './types';
import { apiAnswerGetSurvey, apiAnswerPost } from '@/api/answer';
import { msgError, msgSuccess, msgWarning } from '@/utils/msg';
import { getSurveySuccessCallback } from './utils';
import router from '@/router';
import { useLocalStorage, type RemovableRef } from '@vueuse/core';

export const useAnswerStore = defineStore('answer', {
    state: (): AnswerStore => ({
        answer: {
            data: [] as any as RemovableRef<AnswerItem[]>,
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
            // 这里想要使用 useLocalStorage，有点麻烦，似乎需要组合式 api 才能比较好的实现
            hasSubmit: false,
        },
    }),
    actions: {
        recheckValid() {
            if (this.answer.data.length < 1) return;
            this.local.validForEveryQuestion = this.answer.data.map((item, i) => {
                if (item.type === 'desc') return true;
                if (!item.required) return true;
                if (item.text !== '') return true;
                if (item.option_text.length > 1) return true;

                return false;
            });
        },
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
                localStorage.setItem(`has-submit-${this.$state.survey.id}`, 'true');
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
            this.$state.local.hasSubmit = Boolean(localStorage.getItem(`has-submit-${id}`) === 'true');
            if (this.local.isFetching) return;
            this.local.isFetching = true;
            const res = await apiAnswerGetSurvey(id);
            if (!res.ok) {
                msgError(res.msg);
                router.push({ name: 'not-found' });
            } else {
                getSurveySuccessCallback(res.data, id);
            }
            this.local.isFetching = false;
        },
    },
});
