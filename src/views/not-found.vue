<script setup lang="ts">
import { useLocale } from '@/locale/util';
import { msgError } from '@/utils/msg';
const { toggleZhEn } = useLocale();

const click = () => {
    msgError('api.error.unknown');
};
</script>

<template>
    <h1>404 {{ $t('api.error.unknown') }}</h1>
    <a-space>
        <a-button @click="toggleZhEn">切换语言</a-button>
        <a-button @click="click">点击</a-button>
    </a-space>
</template>
