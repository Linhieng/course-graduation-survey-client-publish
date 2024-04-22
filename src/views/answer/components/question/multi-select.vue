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
//

const checkedValue = ref(
    (() => {
        const len = answerStore.answer.data[props.questionIndex].option_text.length;
        const res = Array(len).fill(false);
        answerStore.answer.data[props.questionIndex].option_text.forEach((item) => {
            res[item.index] = true;
        });
        return res;
    })(),
);

const check = (optionIndex: number) => {
    checkedValue.value[optionIndex] = !checkedValue.value[optionIndex];
    const checkedOptions: QuestionOption[] = [];
    checkedValue.value.forEach((isCheck, index) => {
        if (isCheck) {
            checkedOptions.push(props.question.options[index]);
        }
    });

    answerStore.answer.data[props.questionIndex].option_text = checkedOptions;
    if (!props.question.required) return;
    answerStore.local.validForEveryQuestion[props.questionIndex] = checkedOptions.length >= 1;
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
        <a-space class="checkbox-group" aria-label="checkbox-group" wrap>
            <label class="checkbox" v-for="(item, i) in question.options" :class="{ 'is-checked': checkedValue[i] }">
                <span class="checkbox__icon">
                    <span class="checkbox__icon_selected"> ✅ </span>
                </span>
                <a-space size="mini">
                    <input type="checkbox" @change="check(i)" />
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

.checkbox-group {
    display: flex;
    .checkbox {
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
