<script setup lang="ts">
const props = defineProps<{
    id: number;
}>();
</script>

<template>
    <h1>填写问卷 {{ id }}</h1>
</template>
