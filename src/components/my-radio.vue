<script setup lang="ts">
import type { QuestionItem, QuestionOption } from '@/stores/answer/types';
import { ref } from 'vue';
defineProps<{
    question: QuestionItem;
    radio_list: Array<QuestionOption>;
}>();
const emit = defineEmits(['change']);
const checkedValue = ref<QuestionOption[]>([]);

const check = (item: QuestionOption) => {
    checkedValue.value = [item];
    emit('change', checkedValue.value);
};
</script>

<template>
    <a-space class="radio-group" aria-label="radio-group" wrap>
        <label class="radio" v-for="item in radio_list" :class="{ 'is-checked': checkedValue[0]?.id === item.id }">
            <span class="radio__icon">
                <span class="radio__icon_selected"></span>
            </span>
            <a-space size="mini">
                <input type="radio" :value="JSON.stringify(item)" :name="question.id" @change="check(item)" />
                <span class="radio__label">{{ item.text }}</span>
            </a-space>
        </label>
    </a-space>
</template>

<style scoped lang="scss">
.radio-group {
    display: flex;
    .radio {
        padding: 10px;
        background: white;
        color: black;
        display: flex;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        transition: all 200ms;

        position: relative;
        padding-left: 30px;
        .radio__icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1px solid #999;
            background-color: white;
            .radio__icon_selected {
                position: absolute;
                top: 2px;
                left: 2px;
                right: 2px;
                bottom: 2px;
                border-radius: 50%;
                background-color: #409eff;
                opacity: 0;
                transition: all 200ms;
            }
        }
    }
    input {
        appearance: none;
    }
    .radio.is-checked {
        background: #409eff;
        color: white;
        .radio__icon_selected {
            opacity: 1;
        }
    }
}
</style>
