<script setup lang="ts">
import { useAnswerStore } from '@/stores/answer';
import SurveyBox from './components/survey-box.vue';
import CompletedPage from './completed-page.vue';
import { computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { getBasicQuestionTemplate } from '@/stores/answer/utils';
import type { AnswerItem } from '@/stores/answer/types';
import SurveySkeleton from './components/survey-skeleton.vue';
const answerStore = useAnswerStore();
const props = defineProps<{
    id: number | string;
}>();

answerStore.getSurvey(Number(props.id));

watch(
    () => useAnswerStore().survey.questionList,
    (questionList) => {
        // @ts-ignore
        useAnswerStore().answer.data = useLocalStorage<AnswerItem[]>(
            `answer-data-${props.id}`,
            getBasicQuestionTemplate(questionList),
        );
    },
    {
        once: true,
    },
);

const imgBoxStyle = computed(() => {
    let bg = '';
    if (answerStore.survey?.skin?.background_image?.trim()) {
        bg = `url(${answerStore.survey.skin.background_image})`;
    } else {
        bg = answerStore.survey.skin.bg_img;
    }
    return {
        backgroundImage: bg,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
});
</script>

<template>
    <template v-if="answerStore.local.isFetching">
        <h1 style="text-align: center">正在获取……</h1>
        <SurveySkeleton />
    </template>
    <template v-else>
        <div v-if="answerStore.local.hasSubmit">
            <completed-page>
                <a-space direction="vertical" fill>
                    <span>{{ $t('已提交') }}</span>
                    <a-button @click="useAnswerStore().reAnswer">{{ $t('重新回答') }}</a-button>
                </a-space>
            </completed-page>
        </div>
        <div class="container" v-else>
            <div class="img-box" :style="imgBoxStyle">
                <!-- <img src="" alt=""> -->
            </div>
            <div class="survey-box">
                <div class="main center">
                    <survey-box></survey-box>
                </div>
            </div>
            <footer>问卷系统 @ linhieng</footer>
        </div>
    </template>
</template>

<style scoped lang="scss">
@mixin big-width {
    @media screen and (min-width: 768px) {
        @content;
    }
}
@mixin phone {
    @media screen and not (hover: hover) {
        @content;
    }
    @media screen and (max-width: 768px) {
        @content;
    }
}

.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .img-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .survey-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
}

.img-box {
    background-color: #e1e1e1;
    background-image: linear-gradient(#000, #fff);
}

.main {
    width: 600px;
    @include phone {
        width: 100%;
    }
    background-color: #f6f8fc99;
}
@include big-width {
    .center {
        margin-left: auto;
        margin-right: auto;
    }
    .left {
        padding-left: 100px;
        margin-left: 0;
        margin-right: auto;
    }
    .right {
        padding-right: 100px;
        margin-left: 0;
        margin-right: auto;
    }
}
</style>
