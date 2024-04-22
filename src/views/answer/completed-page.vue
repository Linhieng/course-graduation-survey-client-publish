<script setup lang="ts">
import IconComplete from '@/components/icons/IconCompleted.vue';
</script>

<template>
    <div class="wrap">
        <IconComplete style="width: 100px; height: 100px" />
        <p><slot></slot></p>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
        text-align: center;
        font-size: 2rem;
        margin: 30px;
    }
}
</style>
