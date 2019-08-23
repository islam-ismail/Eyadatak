import axios from "axios";
import { toast } from "react-toastify";
import * as questionTemplateConstants from "./questionTemplateConstants";
import { AppAction } from "../../types/app-action";
import * as questionTemplateTypes from "./questionTemplateTypes";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
    Api_DoctorQuestionTemplatesViewAll_Endpoint,
    Api_DoctorQuestionTemplatesViewAll_Response,
    Api_DoctorQuestionTemplatesAdd_Endpoint,
    Api_DoctorQuestionTemplatesAdd_Payload,
    Api_DoctorQuestionTemplatesAdd_Response,
    Api_DoctorCaseQuestionsAdd_Endpoint,
    Api_DoctorCaseQuestionsAdd_Payload,
    Api_DoctorCaseQuestionsAdd_Response
} from "../../types/api-endpoints/doctor";

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

export const setSavedQuestions = (
    savedQuestions: QuestionTemplate[]
): questionTemplateTypes.SetSavedQuestionsAction => {
    return {
        type: questionTemplateConstants.SET_SAVED_QUESTIONS,
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

export const setSavedQuestionsList: questionTemplateTypes.setSavedQuestionsListSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(questionTemplateActionStart());

            let savedQuestions: QuestionTemplate[] = [];
            const response = await axios.get(Api_DoctorQuestionTemplatesViewAll_Endpoint());
            const responseData: Api_DoctorQuestionTemplatesViewAll_Response = response.data;
            if (responseData.data) {
                savedQuestions = responseData.data.question_templates;
                dispatch(setSavedQuestions(savedQuestions));
            }

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

            const payload: Api_DoctorQuestionTemplatesAdd_Payload = {
                question_text_en: questionText,
                question_text_ar: questionText,
                question_type: questionType,
                question_options_en: answerOptions,
                question_options_ar: answerOptions
            };

            const response = await axios.post(Api_DoctorQuestionTemplatesAdd_Endpoint(), payload);
            const responseData: Api_DoctorQuestionTemplatesAdd_Response = response.data;

            if (addNewQuestionToTemplate && responseData.data) {
                dispatch(addQuestionToTemplate(responseData.data.question_template));
            }

            dispatch(setSavedQuestionsList());

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
                    const payload: Api_DoctorCaseQuestionsAdd_Payload = {
                        question_template_id: questionId
                    };
                    const response = await axios.post(
                        Api_DoctorCaseQuestionsAdd_Endpoint(caseId),
                        payload
                    );
                    const responseData: Api_DoctorCaseQuestionsAdd_Response = response.data;
                    console.log("response:", responseData);
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
