<script setup lang="ts">
import type { QuestionItem } from '@/stores/answer/types';
import { useAnswerStore } from '@/stores/answer';
const answerStore = useAnswerStore();

const props = defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();
const order = props.questionIndex + 1;
</script>

<template>
    <a-space direction="vertical" fill>
        <h2
            :class="{
                required: question.required,
            }"
            :data-order="order"
        >
            <a-space>
                <a-tag v-if="question.required" color="#f53f3f">{{ $t('必填') }}</a-tag>
                {{ question.title }}
            </a-space>
        </h2>
        <p>{{ question.desc }}</p>
        <a-textarea
            :auto-size="{
                minRows: 3,
            }"
            v-model="answerStore.answer.data[questionIndex].text"
            @update:modelValue="
                (v: string) => {
                    if (!question.required) return;
                    answerStore.local.validForEveryQuestion[questionIndex] = v.trim() !== '';
                }
            "
        ></a-textarea>
    </a-space>
</template>

<style scoped lang="scss">
h2 {
    position: relative;
    &::after {
        content: attr(data-order);
        color: #333;
        font-size: 1.3rem;

        position: absolute;
        top: 0;
        right: calc(100% + 1rem);
    }
}
</style>
