import axios from "axios";
import { toast } from "react-toastify";
import * as newCaseConstants from "./newCaseConstants";
import { AppAction } from "../../types/app-action";
import * as newCaseTypes from "./newCaseTypes";
import { Speciality } from "../../types/models/Speciality";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Dispatch } from "redux";

export const newCaseActionStart = (): newCaseTypes.NewCaseActionStartAction => {
    return {
        type: newCaseConstants.NEW_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const newCaseActionFinish = (): newCaseTypes.NewCaseActionFinishAction => {
    return {
        type: newCaseConstants.NEW_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const newCaseActionError = (): newCaseTypes.NewCaseActionErrorAction => {
    return {
        type: newCaseConstants.NEW_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getPrimarySpecialities = (
    data: Speciality[]
): newCaseTypes.GetPrimarySpecialitiesAction => {
    return {
        type: newCaseConstants.GET_PRIMARY_SPECIALITIES,
        payload: data
    };
};

export const getSecondarySpecialities = (
    data: Speciality[]
): newCaseTypes.GetSecondarySpecialitiesAction => {
    return {
        type: newCaseConstants.GET_SECONDARY_SPECIALITIES,
        payload: data
    };
};

export const getRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.GetRequiredQuestionsAction => {
    return {
        type: newCaseConstants.GET_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const getInitialNotRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.GetInitialNotRequiredQuestionsAction => {
    return {
        type: newCaseConstants.GET_INITIAL_NOT_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const getNotRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.GetNotRequiredQuestionsAction => {
    return {
        type: newCaseConstants.GET_NOT_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const getInitialRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.GetInitialRequiredQuestionsAction => {
    return {
        type: newCaseConstants.GET_INITIAL_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const asyncGetPrimarySpecialities: newCaseTypes.asyncGetPrimarySpecialitiesSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response = await axios.get("specialities/0");
            const data = response.data;
            dispatch(getPrimarySpecialities(data.data.specialities));
            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncGetSecondarySpecialities: newCaseTypes.asyncGetSecondarySpecialitiesSig = (
    parentId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response = await axios.get(`specialities/${parentId}`);
            const data = response.data;
            dispatch(getSecondarySpecialities(data.data.specialities));
            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncGetInitialRequiredQuestions: newCaseTypes.asyncGetInitialRequiredQuestionsSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response = await axios.get(`question_templates/0/required`);
            const data = response.data;
            dispatch(getInitialRequiredQuestions(data.data.question_templates));
            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncGetRequiredQuestions: newCaseTypes.asyncGetRequiredQuestionsSig = (
    specialityId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response = await axios.get(`question_templates/${specialityId}/required`);
            const data = response.data;
            dispatch(getRequiredQuestions(data.data.question_templates));
            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncGetInitialNotRequiredQuestions: newCaseTypes.asyncGetInitialNotRequiredQuestionsSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response = await axios.get(`question_templates/0/not_required`);
            const data = response.data;
            dispatch(getInitialNotRequiredQuestions(data.data.question_templates));
            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncGetNotRequiredQuestions: newCaseTypes.asyncGetNotRequiredQuestionsSig = (
    specialityId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response = await axios.get(`question_templates/${specialityId}/not_required`);
            const data = response.data;
            dispatch(getNotRequiredQuestions(data.data.question_templates));
            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const getInitialQuestionValues: newCaseTypes.getInitialQuestionValuesSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response1 = await axios.get("specialities/0");
            const data1 = response1.data;
            dispatch(getPrimarySpecialities(data1.data.specialities));

            const response2 = await axios.get(`question_templates/0/required`);
            const data2 = response2.data;
            dispatch(getInitialRequiredQuestions(data2.data.question_templates));

            const response3 = await axios.get(`question_templates/0/not_required`);
            const data3 = response3.data;
            dispatch(getInitialNotRequiredQuestions(data3.data.question_templates));

            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const addNewCase: newCaseTypes.addNewCaseSig = (
    specialityId: number,
    questionDescription: string,
    patientId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());

            const response = await axios.post(`patient/medical_cases/${patientId}`, {
                speciality_id: specialityId,
                description: questionDescription
            });
            const data = response.data;
            console.log("addNewCase() - data:", data);

            dispatch(newCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};
