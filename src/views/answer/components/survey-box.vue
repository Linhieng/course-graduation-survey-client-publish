<script setup lang="ts">
import { useAnswerStore } from '@/stores/answer';
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
            <p>
                <a-skeleton animation v-if="answerStore.local.isFetching">
                    <a-skeleton-line :rows="1" />
                </a-skeleton>
                <template v-else>
                    {{ $t(answerStore.survey.comment) }}
                </template>
            </p>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    padding: 20px;
    h1,
    p {
        width: 100%;
        text-align: center;
        padding: 20px 20px 0 20px;
    }
}
</style>
