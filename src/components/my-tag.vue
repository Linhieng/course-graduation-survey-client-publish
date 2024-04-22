<script setup lang="ts">
defineProps<{
    text: string;
    red?: boolean;
    green?: boolean;
    gray?: boolean;
}>();
</script>

<template>
    <div
        :class="{
            red: red,
            green: green,
            gray: gray,
        }"
    >
        {{ text }}
    </div>
</template>

<style scoped lang="scss">
div {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
}
div.red {
    background-color: red;
    color: white;
}
div.green {
    background-color: #00b42a;
    color: white;
}
div.gray {
    background-color: gray;
    color: white;
}
</style>
