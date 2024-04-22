<script setup lang="ts">
import type { QuestionItem, QuestionOption } from '@/stores/answer/types';
import { ref } from 'vue';
const props = defineProps<{
    question: QuestionItem;
    data_list: Array<QuestionOption>;
}>();
const emit = defineEmits(['change']);
const checkedValue = ref(Array(props.data_list.length).fill(false));

const check = (item: QuestionOption, index: number) => {
    checkedValue.value[index] = !checkedValue.value[index];
    const res = [];
    checkedValue.value.forEach((isCheck, index) => {
        if (isCheck) {
            res.push(props.data_list[index]);
        }
    });
    emit('change', res);
};
</script>

<template>
    <a-space class="checkbox-group" aria-label="checkbox-group" wrap>
        <label class="checkbox" v-for="(item, i) in data_list" :class="{ 'is-checked': checkedValue[i] }">
            <span class="checkbox__icon">
                <span class="checkbox__icon_selected"> ✅ </span>
            </span>
            <a-space size="mini">
                <input type="checkbox" @change="check(item, i)" />
                <span class="radio__label">{{ item.text }}</span>
            </a-space>
        </label>
    </a-space>
</template>

<style scoped lang="scss">
.checkbox-group {
    display: flex;
    .checkbox {
        padding: 10px;
        background: white;
        color: black;
        display: flex;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        transition: all 200ms;

        position: relative;
        padding-left: 30px;
        .checkbox__icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
            width: 15px;
            height: 15px;
            outline: 1px solid #999;
            background-color: white;
            .checkbox__icon_selected {
                position: absolute;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: all 100ms;
                outline: 1px solid white;
                color: white;
                padding: 1px;
            }
        }
    }
    input {
        appearance: none;
    }
    .checkbox.is-checked {
        background: #409eff;
        color: white;
        .checkbox__icon {
            outline: none;
            background-color: transparent;
        }
        .checkbox__icon_selected {
            opacity: 1;
        }
    }
}
</style>
