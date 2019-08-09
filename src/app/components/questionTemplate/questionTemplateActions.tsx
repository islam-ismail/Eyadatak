import axios from "axios";
import { toast } from "react-toastify";
import {
    QUESTION_TEMPLATE_ACTION_START,
    QUESTION_TEMPLATE_ACTION_FINISH,
    QUESTION_TEMPLATE_ACTION_ERROR,
    GET_SAVED_QUESTIONS,
    ADD_QUESTION_TO_TEMPLATE,
    SEND_CASE_QUESTIONS
} from "./questionTemplateConstants";
import { AppAction } from "../../types/app-action";
import { GetSavedQuestionsAction, AddQuestionToTemplateAction } from "./questionTemplateTypes";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Dispatch } from "redux";

export const questionTemplateActionStart = (): AppAction => {
    return {
        type: QUESTION_TEMPLATE_ACTION_START,
        excludeRefresh: true
    };
};

export const questionTemplateActionFinish = (): AppAction => {
    return {
        type: QUESTION_TEMPLATE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const questionTemplateActionError = (): AppAction => {
    return {
        type: QUESTION_TEMPLATE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getSavedQuestions = (savedQuestions: QuestionTemplate[]): GetSavedQuestionsAction => {
    return {
        type: GET_SAVED_QUESTIONS,
        payload: savedQuestions
    };
};

export const addQuestionToTemplate = (
    questionToAdd: QuestionTemplate
): AddQuestionToTemplateAction => {
    return {
        type: ADD_QUESTION_TO_TEMPLATE,
        payload: questionToAdd
    };
};

export const sendCaseQuestions = (): AppAction => {
    return {
        type: SEND_CASE_QUESTIONS,
        excludeRefresh: true
    };
};

export const getSavedQuestionsList = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(questionTemplateActionStart());

            const response = await axios.get(`doctor/question_templates`);
            const data = response.data;
            const savedQuestions = data.data.question_templates;
            dispatch(getSavedQuestions(savedQuestions));

            dispatch(questionTemplateActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(questionTemplateActionError());
        }
    };
};

export const saveNewQuestion = (
    questionText: string,
    questionType: string,
    answerOptions: string[],
    addNewQuestionToTemplate: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(questionTemplateActionStart());

            const response = await axios.post(`doctor/question_templates`, {
                question_text_en: questionText,
                question_text_ar: questionText,
                question_type: questionType,
                question_options_en: answerOptions,
                question_options_ar: answerOptions
            });
            const data = response.data;

            if (addNewQuestionToTemplate)
                dispatch(addQuestionToTemplate(data.data.question_template));

            dispatch(getSavedQuestionsList());

            dispatch(questionTemplateActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(questionTemplateActionError());
        }
    };
};

export const sendCaseTemplateQuestions = (questionIds: number[], caseId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(questionTemplateActionStart());

            console.log("questionIds:", questionIds, "caseId:", caseId);
            await Promise.all(
                questionIds.map(async questionId => {
                    const response = await axios.post(`doctor/case_questions/${caseId}`, {
                        question_template_id: questionId
                    });
                    console.log("response:", response);
                })
            );

            dispatch(questionTemplateActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(questionTemplateActionError());
        }
    };
};
