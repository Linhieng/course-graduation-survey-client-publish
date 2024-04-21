export interface AnswerStore {
    answer: {};
    survey: {
        id: number | undefined;
        title: string;
        comment: string;
        questionList: QuestionItem[];
    };
    local: {
        /** 正在获取问卷 */
        isFetching: boolean;
        /** 正在提交回答 */
        isPushing: boolean;
    };
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

/** 回答时，存储的内容 */
export interface ReqSurveyAnswer {
    surveyId: number;
    userId?: number;
    /** 单位秒 */
    spendTime: number;
    /** 问题回答的内容，数据库中仅保存，不解析 */
    answerList: AnswerStructureJson;
}
interface AnswerStructureJson {
    [key: string]: any;
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
}
export interface SurveyStructureJson {
    version: '0.2.0';
    questionList: QuestionItem[];
}
export interface QuestionItem {
    id: string;
    type: QuestionType;
    order: number;
    title: string;
    required: boolean;

    // 下面内容全部弄成必填，更方便类型判断
    /** 问题描述，除了“描述”，其他问题基本都会有这个属性 */
    desc: string;
    /** 通用选项，包括单选项、多选项、图片选项等等 */
    options: Array<QuestionOption>;
}
export type QuestionType =
    /** 单行文本 */
    | 'single_text'
    /** 多行文本 */
    | 'multi_text'
    /** 单选题 */
    | 'single_select'
    /** 多选题 */
    | 'multi_select';

/** 一个选项 */
export interface QuestionOption {
    id: string;
    index: number;
    text: string;
    url: string;
}
