import axios from "axios";
import { toast } from "react-toastify";
import * as questionTemplateConstants from "./questionTemplateConstants";
import { AppAction } from "../../types/app-action";
import * as questionTemplateTypes from "./questionTemplateTypes";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const questionTemplateActionStart = (): questionTemplateTypes.QuestionTemplateActionStartedAction => {
    return {
        type: questionTemplateConstants.QUESTION_TEMPLATE_ACTION_START,
        excludeRefresh: true
    };
};

export const questionTemplateActionFinish = (): questionTemplateTypes.QuestionTemplateActionFinishedAction => {
    return {
        type: questionTemplateConstants.QUESTION_TEMPLATE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const questionTemplateActionError = (): questionTemplateTypes.QuestionTemplateActionErrorAction => {
    return {
        type: questionTemplateConstants.QUESTION_TEMPLATE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getSavedQuestions = (
    savedQuestions: QuestionTemplate[]
): questionTemplateTypes.GetSavedQuestionsAction => {
    return {
        type: questionTemplateConstants.GET_SAVED_QUESTIONS,
        payload: savedQuestions
    };
};

export const addQuestionToTemplate = (
    questionToAdd: QuestionTemplate
): questionTemplateTypes.AddQuestionToTemplateAction => {
    return {
        type: questionTemplateConstants.ADD_QUESTION_TO_TEMPLATE,
        payload: questionToAdd
    };
};

export const sendCaseQuestions = (): questionTemplateTypes.SendCaseQuestionsAction => {
    return {
        type: questionTemplateConstants.SEND_CASE_QUESTIONS,
        excludeRefresh: true
    };
};

export const getSavedQuestionsList: questionTemplateTypes.getSavedQuestionsListSig = () => {
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

export const saveNewQuestion: questionTemplateTypes.saveNewQuestionSig = (
    questionText: string,
    questionType: string,
    answerOptions: string[],
    addNewQuestionToTemplate: boolean
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
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

export const sendCaseTemplateQuestions: questionTemplateTypes.sendCaseTemplateQuestionsSig = (
    questionIds: number[],
    caseId: number
) => {
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
