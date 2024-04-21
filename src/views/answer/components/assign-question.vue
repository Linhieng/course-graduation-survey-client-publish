<script setup lang="ts">
import type { QuestionItem } from '@/stores/answer/types';
import { useAnswerStore } from '@/stores/answer';
const answerStore = useAnswerStore();
defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();
</script>

<template>
    <a-space v-if="question.type === 'desc'" direction="vertical" fill>
        <h2 class="desc">{{ question.title }}</h2>
    </a-space>
    <a-space v-else-if="question.type === 'single_text'" direction="vertical" fill>
        <h2>{{ question.title }}</h2>
        <p>{{ question.desc }}</p>
        <a-textarea auto-size v-model="answerStore.answer.data[questionIndex].text"></a-textarea>
    </a-space>
    <a-space v-else-if="question.type === 'multi_text'" direction="vertical" fill>
        <h2>{{ question.title }}</h2>
        <p>{{ question.desc }}</p>
        <a-textarea :auto-size="{ minRows: 3 }" v-model="answerStore.answer.data[questionIndex].text"></a-textarea>
    </a-space>
    <a-space v-else-if="question.type === 'single_select'" direction="vertical" fill>
        <h2>{{ question.title }}</h2>
        <p>{{ question.desc }}</p>
        {{ question.options }}
        <a-radio-group>
            <a-radio :value="option.id" v-for="option in question.options">
                <template #radio="{ checked }">
                    <a-tag :checked="checked" checkable>{{ $options.text }}</a-tag>
                </template>
            </a-radio>
        </a-radio-group>
    </a-space>
</template>

<style scoped lang="scss">
.desc {
    font-size: 1.2rem;
}
</style>
