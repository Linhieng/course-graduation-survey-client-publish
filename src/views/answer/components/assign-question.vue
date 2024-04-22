<script setup lang="ts">
import type { QuestionItem } from '@/stores/answer/types';
import { useAnswerStore } from '@/stores/answer';
import myRadio from '@/components/my-radio.vue';
import { ref } from 'vue';
const answerStore = useAnswerStore();
defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();
const abc = ref();
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
        <my-radio
            :radio_list="question.options"
            :question="question"
            @change="(item) => (answerStore.answer.data[questionIndex].option_text = item)"
        />
    </a-space>
</template>

<style scoped lang="scss">
.desc {
    font-size: 1.2rem;
}
</style>
