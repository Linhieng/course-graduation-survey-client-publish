import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { AnswerStore } from './types';

export const useAnswerStore = defineStore('answer', {
    state: (): AnswerStore => ({
        answer: {},
        survey: {
            surveyId: undefined,
        },
    }),
});
