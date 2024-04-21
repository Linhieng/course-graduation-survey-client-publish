<script setup lang="ts">
import { useAnswerStore } from '@/stores/answer';
import surveyBox from './components/survey-box.vue';
const answerStore = useAnswerStore();
const props = defineProps<{
    id: number | string;
}>();

answerStore.getSurvey(Number(props.id));
</script>

<template>
    <div class="container">
        <p>填写问卷 {{ id }}</p>
        <div class="img-box">
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

<style scoped lang="scss">
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
        overflow: hidden;
    }
}

.img-box {
    background-color: #e1e1e1;
}

.main {
    width: 60%;
    background-color: white;
    overflow: auto;
}
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
</style>
