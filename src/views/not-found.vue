<script setup lang="ts">
import { useLocale } from '@/locale/util';
const { toggleZhEn } = useLocale();
</script>

<template>
    <h1>404 {{ $t('api.error.unknown') }}</h1>
    <button @click="toggleZhEn">切换语言</button>
</template>
