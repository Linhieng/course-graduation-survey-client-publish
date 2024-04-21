<script setup lang="ts">
import { useAnswerStore } from '@/stores/answer';
import AssignQuestion from './assign-question.vue';
const answerStore = useAnswerStore();
</script>

<template>
    <div>
        <div class="container">
            <h1>
                <a-skeleton animation v-if="answerStore.local.isFetching">
                    <a-skeleton-line :rows="1" />
                </a-skeleton>
                <template v-else>
                    {{ $t(answerStore.survey.title) }}
                </template>
            </h1>
            <p class="desc">
                <a-skeleton animation v-if="answerStore.local.isFetching">
                    <a-skeleton-line :rows="1" />
                </a-skeleton>
                <template v-else>
                    {{ $t(answerStore.survey.comment) }}
                </template>
            </p>
            <a-space class="question-list" :size="40" direction="vertical" fill>
                <assign-question
                    v-for="(question, questionIndex) in answerStore.survey.questionList"
                    :key="question.id"
                    :question="question"
                    :questionIndex="questionIndex"
                />
            </a-space>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    padding: 40px;

    h1,
    p {
        width: 100%;
        text-align: center;
        padding: 20px 20px 0 20px;
    }
    & > p.desc {
        text-align: start;
        text-indent: 2rem;
        padding: 40px;
    }

    .question-list {
        padding: 40px;
    }
}
</style>
