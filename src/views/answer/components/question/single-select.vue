<script setup lang="ts">
import type { QuestionItem, QuestionOption } from '@/stores/answer/types';
import { useAnswerStore } from '@/stores/answer';
import { ref } from 'vue';
const answerStore = useAnswerStore();

const props = defineProps<{
    question: QuestionItem;
    questionIndex: number;
}>();
const order = props.questionIndex + 1;

//
//
//
//

const checkedValue = ref<QuestionOption[]>(answerStore.answer.data[props.questionIndex].option_text);
const check = (item: QuestionOption) => {
    checkedValue.value = [item];
    answerStore.answer.data[props.questionIndex].option_text = [item];
    if (!props.question.required) return;

    answerStore.local.validForEveryQuestion[props.questionIndex] =
        answerStore.answer.data[props.questionIndex].option_text.length >= 1;
};
</script>

<template>
    <a-space direction="vertical" fill>
        <h2
            :class="{
                required: question.required,
            }"
            :data-order="order"
        >
            <a-space>
                <a-tag v-if="question.required" color="#f53f3f">{{ $t('必填') }}</a-tag>
                {{ question.title }}
            </a-space>
        </h2>
        <p>{{ question.desc }}</p>
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <a-space class="radio-group" aria-label="radio-group" wrap size="medium">
            <label
                class="radio"
                v-for="item in question.options"
                :class="{ 'is-checked': checkedValue[0]?.id === item.id }"
            >
                <span class="radio__icon">
                    <span class="radio__icon_selected"></span>
                </span>
                <a-space size="mini">
                    <input type="radio" :value="JSON.stringify(item)" :name="question.id" @change="check(item)" />
                    <span class="radio__label">{{ item.text }}</span>
                </a-space>
            </label>
        </a-space>
    </a-space>
</template>

<style scoped lang="scss">
h2 {
    position: relative;
    &::after {
        content: attr(data-order);
        color: #333;
        font-size: 1.3rem;

        position: absolute;
        top: 0;
        right: calc(100% + 1rem);
    }
}

.radio-group {
    display: flex;
    .radio {
        min-width: 100px;
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
