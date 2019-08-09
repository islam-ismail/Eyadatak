import { createReducer } from "../../reducers/reducerUtil";
import {
    QUESTION_TEMPLATE_ACTION_START,
    QUESTION_TEMPLATE_ACTION_FINISH,
    QUESTION_TEMPLATE_ACTION_ERROR,
    GET_SAVED_QUESTIONS,
    ADD_QUESTION_TO_TEMPLATE,
    SEND_CASE_QUESTIONS
} from "./questionTemplateConstants";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";

export interface QuestionTemplateState {
    savedQuestions: QuestionTemplate[];
    templateToSend: QuestionTemplate[];
    loading?: boolean;
}

const initialState: QuestionTemplateState = {
    savedQuestions: [],
    templateToSend: []
};

export const questionTemplateActionStarted = (
    state: QuestionTemplateState,
    payload: any
): QuestionTemplateState => {
    return {
        ...state,
        loading: true
    };
};

export const questionTemplateActionFinished = (
    state: QuestionTemplateState,
    payload: any
): QuestionTemplateState => {
    return {
        ...state,
        loading: false
    };
};

export const questionTemplateActionError = (
    state: QuestionTemplateState,
    payload: any
): QuestionTemplateState => {
    return {
        ...state,
        loading: false
    };
};

export const getSavedQuestions = (
    state: QuestionTemplateState,
    payload: QuestionTemplate[]
): QuestionTemplateState => {
    return {
        ...state,
        savedQuestions: payload
    };
};

export const addQuestionToTemplate = (
    state: QuestionTemplateState,
    payload: QuestionTemplate
): QuestionTemplateState => {
    return {
        ...state,
        templateToSend: [...state.templateToSend, payload]
    };
};

export const sendCaseQuestions = (
    state: QuestionTemplateState,
    payload: any
): QuestionTemplateState => {
    return {
        ...state
    };
};

export default createReducer(initialState, {
    [QUESTION_TEMPLATE_ACTION_START]: questionTemplateActionStarted,
    [QUESTION_TEMPLATE_ACTION_FINISH]: questionTemplateActionFinished,
    [QUESTION_TEMPLATE_ACTION_ERROR]: questionTemplateActionError,
    [GET_SAVED_QUESTIONS]: getSavedQuestions,
    [ADD_QUESTION_TO_TEMPLATE]: addQuestionToTemplate,
    [SEND_CASE_QUESTIONS]: sendCaseQuestions
});
