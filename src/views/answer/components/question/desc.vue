<script setup lang="ts">
import type { QuestionItem } from '@/stores/answer/types';

defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();
</script>

<template>
    <p class="desc">{{ question.title }}</p>
</template>
<style scoped lang="scss">
.desc {
    font-size: 1.2rem;
}
</style>
