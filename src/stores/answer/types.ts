import type { RemovableRef } from '@vueuse/core';

export interface AnswerStore {
    /** 单位是毫秒，提交时再转换为秒 */
    startTime: number;
    /* AnswerStructureJson */
    answer: {
        /** 问题回答填写在这里。不要使用可选，全部写成一个对象比较方便！ */
        data: RemovableRef<AnswerItem[]>;
    };
    survey: {
        id: number | undefined;
        title: string;
        comment: string;
        questionList: QuestionItem[];
        skin: {
            /** css 渐变背景 */
            bg_img: string,
            /** 背景图片 */
            background_image: string,
            survey_width?: any,
            survey_position?: any,
            background_image_position?: any,
            bg_object_fit?: any,
            bg_position?: any,
            bg_width?: any,
            bg_color?: any,
        },
    };
    local: {
        /** 每个问题的回答是否有效 */
        validForEveryQuestion: boolean[];
        /** 正在获取问卷 */
        isFetching: boolean;
        /** 正在提交回答 */
        isPushing: boolean;
        /** 是否已提交 */
        hasSubmit: boolean;
    };
}
//
//
//
//
export interface AnswerItem {
    type: QuestionType;
    required: boolean;
    id: string;
    text: string;
    option_text: Array<QuestionOption>;
}
//
//
//
//
//
//
//

/** 回答时，存储的内容 */
export interface ReqSurveyAnswer {
    surveyId: number;
    userId?: number;
    /** 单位秒 */
    spendTime?: number;
    /** 问题回答的内容，数据库中仅保存，不解析 */
    answerStructureJson: AnswerStructureJson;
}
interface AnswerStructureJson {
    data: AnswerItem[];
    // other
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export interface ApiResSurvey {
    id: number;
    title: string;
    comment: string;
    structure_json: SurveyStructureJson;
    /** 暂时这样写吧 */
    skin: any;
}
export interface SurveyStructureJson {
    version: '0.2.0';
    questionList: QuestionItem[];
}
export interface QuestionItem {
    id: string;
    type: QuestionType;
    /** 虽然是 order，但这里是从 0 开始，这算是遗留问题吧？ */
    order: number;
    title: string;
    required: boolean;

    // 下面内容全部弄成必填，更方便类型判断
    /** 问题描述，除了“描述”，其他问题基本都会有这个属性 */
    desc: string;
    /** 通用选项，包括单选项、多选项、图片选项等等 */
    options: Array<QuestionOption>;
    /** 矩阵类型问题的子标题数组 */
    titles: Array<QuestionTitlesItem>;
}
/** 类型为矩阵问题中的单项问题标题 */
export interface QuestionTitlesItem {
    id: string;
    text: string;
}
export type QuestionType =
    /** 单行文本 */
    | 'single_text'
    /** 多行文本 */
    | 'multi_text'
    /** 单选题 */
    | 'single_select'
    /** 多选题 */
    | 'multi_select'
    // /** 图片单选题 */
    // | 'pic_single_select'
    // /** 图片多选题 */
    // | 'pic_multi_select'
    // /** 单文件上传 */
    // | 'single_file'
    // /** 多文件上传 */
    // | 'multi_file'
    // /** 评分题 */
    // | 'score'
    // /** 量表题 */
    // | 'NPS'
    /** 矩阵单选 */
    | 'matrix_single_select'
    /** 矩阵多选 */
    | 'matrix_multi_select'
    // /** 矩阵量表 */
    // | 'matrix_NPS'
    // /** 矩阵评分 */
    // | 'matrix_scope'
    // /** 自增文本 */
    // | 'auto_text'
    // /** 填充题 */
    // | 'input_text'
    // /** 自增表格 */
    // | 'auto_table'
    /** 非填空的文本描述 */
    | 'desc';

/** 一个选项 */
export interface QuestionOption {
    id: string;
    index: number;
    text: string;
    url: string;
}
