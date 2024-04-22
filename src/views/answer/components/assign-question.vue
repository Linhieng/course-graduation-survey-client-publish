<script setup lang="ts">
import type { QuestionItem } from '@/stores/answer/types';
import Desc from './question/desc.vue';
import SingleText from './question/single-text.vue';
import MultiText from './question/multi-text.vue';
import SingleSelect from './question/single-select.vue';
import MultiSelect from './question/multi-select.vue';
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
        <template v-if="question.type === 'desc'">
            <Desc :question="question" :questionIndex="questionIndex" />
        </template>
        <template v-else-if="question.type === 'single_text'">
            <SingleText :question="question" :questionIndex="questionIndex" />
        </template>
        <template v-else-if="question.type === 'multi_text'">
            <MultiText :question="question" :questionIndex="questionIndex" />
        </template>
        <template v-else-if="question.type === 'single_select'">
            <SingleSelect :question="question" :questionIndex="questionIndex" />
        </template>
        <template v-else-if="question.type === 'multi_select'">
            <MultiSelect :question="question" :questionIndex="questionIndex" />
        </template>
    </div>
</template>
