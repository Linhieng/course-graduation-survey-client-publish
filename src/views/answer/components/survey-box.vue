<script setup lang="ts">
import { useAnswerStore } from '@/stores/answer';
import AssignQuestion from './assign-question.vue';
const answerStore = useAnswerStore();
</script>

<template>
    <div>
        <div class="container">
            <h1>
                {{ answerStore.survey.title }}
            </h1>
            <p class="desc">
                <a-skeleton animation v-if="answerStore.local.isFetching">
                    <a-skeleton-line :rows="1" />
                </a-skeleton>
                <template v-else>
                    {{ answerStore.survey.comment }}
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
            <div class="btn-wrap">
                <a-button
                    :loading="answerStore.local.isPushing"
                    class="submit-btn"
                    type="primary"
                    @click="answerStore.submitAnswer()"
                >
                    提交
                </a-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    min-height: 100vh;
    padding: 40px;
    padding-bottom: 80px;
    position: relative;

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

    .btn-wrap {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 50px;
        display: flex;
        justify-content: center;
        .submit-btn {
            width: 80%;
            padding: 20px;
            margin: auto;
            font-size: 1.3rem;
        }
    }
}
</style>
