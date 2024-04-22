<script setup lang="ts">
import type { QuestionItem } from '@/stores/answer/types';
import { useAnswerStore } from '@/stores/answer';
import MyRadio from '@/components/my-radio.vue';
import MyCheckbox from '@/components/my-checkbox.vue';
const answerStore = useAnswerStore();
defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();
</script>

<template>
    <div
        class="question-item-wrap"
        :data-order="questionIndex + 1"
        :class="{
            required: question.required,
        }"
    >
        <a-space v-if="question.type === 'desc'" direction="vertical" fill>
            <h2 class="desc">{{ question.title }}</h2>
        </a-space>
        <a-space v-else-if="question.type === 'single_text'" direction="vertical" fill>
            <h2>{{ question.title }}</h2>
            <p>{{ question.desc }}</p>
            <a-textarea
                auto-size
                v-model="answerStore.answer.data[questionIndex].text"
                @update:modelValue="
                    (v: string) => {
                        if (!question.required) return;
                        answerStore.local.validForEveryQuestion[questionIndex] = v.trim() !== '';
                    }
                "
            ></a-textarea>
        </a-space>
        <a-space v-else-if="question.type === 'multi_text'" direction="vertical" fill>
            <h2>{{ question.title }}</h2>
            <p>{{ question.desc }}</p>
            <a-textarea
                :auto-size="{ minRows: 3 }"
                v-model="answerStore.answer.data[questionIndex].text"
                @update:modelValue="
                    (v: string) => {
                        if (!question.required) return;
                        answerStore.local.validForEveryQuestion[questionIndex] = v.trim() !== '';
                    }
                "
            ></a-textarea>
        </a-space>
        <a-space v-else-if="question.type === 'single_select'" direction="vertical" fill>
            <h2>{{ question.title }}</h2>
            <p>{{ question.desc }}</p>
            <my-radio
                :radio_list="question.options"
                :question="question"
                @change="
                    (item) => {
                        answerStore.answer.data[questionIndex].option_text = item;
                        if (!question.required) return;
                        answerStore.local.validForEveryQuestion[questionIndex] = item.length >= 1;
                    }
                "
            />
        </a-space>
        <a-space v-else-if="question.type === 'multi_select'" direction="vertical" fill>
            <h2>{{ question.title }}</h2>
            <p>{{ question.desc }}</p>
            <my-checkbox
                :data_list="question.options"
                :question="question"
                @change="
                    (item) => {
                        answerStore.answer.data[questionIndex].option_text = item;
                        if (!question.required) return;
                        answerStore.local.validForEveryQuestion[questionIndex] = item.length >= 1;
                    }
                "
            />
        </a-space>
    </div>
</template>

<style scoped lang="scss">
.desc {
    font-size: 1.2rem;
}
.question-item-wrap {
    position: relative;
    h2 {
        position: relative;
    }
    &::after {
        content: attr(data-order);
        color: #333;
        font-size: 1.3rem;
        position: absolute;
        top: 0;
        right: calc(100% + 1.2rem);
    }
    &.required h2::before {
        content: '*';
        color: red;
        position: absolute;
        left: -1rem;
    }
}
</style>
