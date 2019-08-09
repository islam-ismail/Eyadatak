import axios from "axios";
import { toast } from "react-toastify";
import {
    NEW_CASE_ACTION_START,
    NEW_CASE_ACTION_FINISH,
    NEW_CASE_ACTION_ERROR,
    GET_PRIMARY_SPECIALITIES,
    GET_SECONDARY_SPECIALITIES,
    GET_INITIAL_REQUIRED_QUESTIONS,
    GET_REQUIRED_QUESTIONS,
    GET_INITIAL_NOT_REQUIRED_QUESTIONS,
    GET_NOT_REQUIRED_QUESTIONS
} from "./newCaseConstants";
import { AppAction } from "../../types/app-action";
import {
    GetInitialNotRequiredQuestionsAction,
    GetRequiredQuestionsAction,
    GetInitialRequiredQuestionsAction,
    GetSecondarySpecialitiesAction,
    GetPrimarySpecialitiesAction,
    GetNotRequiredQuestionsAction
} from "./newCaseTypes";
import { Speciality } from "../../types/models/Speciality";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Dispatch } from "redux";

export const newCaseActionStart = (): AppAction => {
    return {
        type: NEW_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const newCaseActionFinish = (): AppAction => {
    return {
        type: NEW_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const newCaseActionError = (): AppAction => {
    return {
        type: NEW_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getPrimarySpecialities = (data: Speciality[]): GetPrimarySpecialitiesAction => {
    return {
        type: GET_PRIMARY_SPECIALITIES,
        payload: data
    };
};

export const asyncGetPrimarySpecialities = () => {
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

export const getSecondarySpecialities = (data: Speciality[]): GetSecondarySpecialitiesAction => {
    return {
        type: GET_SECONDARY_SPECIALITIES,
        payload: data
    };
};

export const asyncGetSecondarySpecialities = (parentId: number) => {
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

export const getInitialRequiredQuestions = (
    data: QuestionTemplate[]
): GetInitialRequiredQuestionsAction => {
    return {
        type: GET_INITIAL_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const asyncGetInitialRequiredQuestions = () => {
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

export const getRequiredQuestions = (data: QuestionTemplate[]): GetRequiredQuestionsAction => {
    return {
        type: GET_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const asyncGetRequiredQuestions = (specialityId: number) => {
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

export const getInitialNotRequiredQuestions = (
    data: QuestionTemplate[]
): GetInitialNotRequiredQuestionsAction => {
    return {
        type: GET_INITIAL_NOT_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const asyncGetInitialNotRequiredQuestions = () => {
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

export const getNotRequiredQuestions = (
    data: QuestionTemplate[]
): GetNotRequiredQuestionsAction => {
    return {
        type: GET_NOT_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const asyncGetNotRequiredQuestions = (specialityId: number) => {
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

export const getInitialQuestionValues = () => {
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

export const addNewCase = (
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
