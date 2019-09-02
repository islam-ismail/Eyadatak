import axios from "axios";
import { toast } from "react-toastify";
import * as newCaseConstants from "./newCaseConstants";
import { AppAction } from "../../types/app-action";
import * as newCaseTypes from "./newCaseTypes";
import { Speciality } from "../../types/models/Speciality";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Dispatch } from "redux";
import { addNewCaseToMyList } from "../myCasesList/myCasesListActions";
import {
    Api_SpecialitiesViewAll_Endpoint,
    Api_SpecialitiesViewAll_Response
} from "../../types/api-endpoints/specialities";
import {
    Api_QuestionTemplatesViewRequired_Endpoint,
    Api_QuestionTemplatesViewRequired_Response,
    Api_QuestionTemplatesViewNotRequired_Endpoint,
    Api_QuestionTemplatesViewNotRequired_Response
} from "../../types/api-endpoints/question-templates";
import {
    Api_PatientMedicalCasesAdd_Endpoint,
    Api_PatientMedicalCasesAdd_Payload,
    Api_PatientMedicalCasesAdd_Response
} from "../../types/api-endpoints/patient";
import { MedicalCase } from "../../types/models/MedicalCase";

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

export const setPrimarySpecialities = (
    data: Speciality[]
): newCaseTypes.SetPrimarySpecialitiesAction => {
    return {
        type: newCaseConstants.SET_PRIMARY_SPECIALITIES,
        payload: data
    };
};

export const setSecondarySpecialities = (
    data: Speciality[]
): newCaseTypes.SetSecondarySpecialitiesAction => {
    return {
        type: newCaseConstants.SET_SECONDARY_SPECIALITIES,
        payload: data
    };
};

export const setRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.SetRequiredQuestionsAction => {
    return {
        type: newCaseConstants.SET_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const setInitialNotRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.SetInitialNotRequiredQuestionsAction => {
    return {
        type: newCaseConstants.SET_INITIAL_NOT_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const setNotRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.SetNotRequiredQuestionsAction => {
    return {
        type: newCaseConstants.SET_NOT_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const setInitialRequiredQuestions = (
    data: QuestionTemplate[]
): newCaseTypes.SetInitialRequiredQuestionsAction => {
    return {
        type: newCaseConstants.SET_INITIAL_REQUIRED_QUESTIONS,
        payload: data
    };
};

export const setNewToBePaidCase = (data: MedicalCase): newCaseTypes.SetNewToBePaidCaseAction => {
    return {
        type: newCaseConstants.SET_NEW_TO_BE_PAID_CASE,
        payload: data
    };
};

export const removeNewToBePaidCase = (): newCaseTypes.RemoveNewToBePaidCaseAction => {
    return {
        type: newCaseConstants.REMOVE_NEW_TO_BE_PAID_CASE
    };
};

export const asyncSetPrimarySpecialities: newCaseTypes.asyncSetPrimarySpecialitiesSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());

            const response = await axios.get(Api_SpecialitiesViewAll_Endpoint());
            const responseData: Api_SpecialitiesViewAll_Response = response.data;
            if (responseData.data) {
                dispatch(setPrimarySpecialities(responseData.data.specialities));
            }

            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncSetSecondarySpecialities: newCaseTypes.asyncSetSecondarySpecialitiesSig = (
    parentId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());

            const response = await axios.get(Api_SpecialitiesViewAll_Endpoint(parentId));
            const responseData: Api_SpecialitiesViewAll_Response = response.data;
            if (responseData.data) {
                dispatch(setSecondarySpecialities(responseData.data.specialities));
            }

            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncSetInitialRequiredQuestions: newCaseTypes.asyncSetInitialRequiredQuestionsSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());

            const response = await axios.get(Api_QuestionTemplatesViewRequired_Endpoint());
            const responseData: Api_QuestionTemplatesViewRequired_Response = response.data;
            if (responseData.data) {
                dispatch(setInitialRequiredQuestions(responseData.data.question_templates));
            }

            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncSetRequiredQuestions: newCaseTypes.asyncSetRequiredQuestionsSig = (
    specialityId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());

            const response = await axios.get(
                Api_QuestionTemplatesViewRequired_Endpoint(specialityId)
            );
            const responseData: Api_QuestionTemplatesViewRequired_Response = response.data;
            if (responseData.data) {
                dispatch(setRequiredQuestions(responseData.data.question_templates));
            }

            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncSetInitialNotRequiredQuestions: newCaseTypes.asyncSetInitialNotRequiredQuestionsSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());

            const response = await axios.get(Api_QuestionTemplatesViewNotRequired_Endpoint());
            const responseData: Api_QuestionTemplatesViewNotRequired_Response = response.data;
            if (responseData.data) {
                dispatch(setInitialNotRequiredQuestions(responseData.data.question_templates));
            }

            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const asyncSetNotRequiredQuestions: newCaseTypes.asyncSetNotRequiredQuestionsSig = (
    specialityId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());

            const response = await axios.get(
                Api_QuestionTemplatesViewNotRequired_Endpoint(specialityId)
            );
            const responseData: Api_QuestionTemplatesViewNotRequired_Response = response.data;
            if (responseData.data) {
                dispatch(setNotRequiredQuestions(responseData.data.question_templates));
            }

            dispatch(newCaseActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(newCaseActionError());
        }
    };
};

export const setInitialQuestionValues: newCaseTypes.setInitialQuestionValuesSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(newCaseActionStart());
            const response1 = await axios.get(Api_SpecialitiesViewAll_Endpoint());
            const responseData1: Api_SpecialitiesViewAll_Response = response1.data;
            if (responseData1.data) {
                dispatch(setPrimarySpecialities(responseData1.data.specialities));
            }

            const response2 = await axios.get(Api_QuestionTemplatesViewRequired_Endpoint());
            const responseData2: Api_QuestionTemplatesViewRequired_Response = response2.data;
            if (responseData2.data) {
                dispatch(setInitialRequiredQuestions(responseData2.data.question_templates));
            }

            const response3 = await axios.get(Api_QuestionTemplatesViewNotRequired_Endpoint());
            const responseData3: Api_QuestionTemplatesViewNotRequired_Response = response3.data;
            if (responseData3.data) {
                dispatch(setInitialNotRequiredQuestions(responseData3.data.question_templates));
            }

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

            const payload: Api_PatientMedicalCasesAdd_Payload = {
                speciality_id: specialityId,
                description: questionDescription
            };
            const response = await axios.post(
                Api_PatientMedicalCasesAdd_Endpoint(patientId),
                payload
            );
            const responseData: Api_PatientMedicalCasesAdd_Response = response.data;

            if (
                responseData.status === false ||
                !responseData.data ||
                !responseData.data.medical_case
            ) {
                throw new Error(responseData.error_message);
            }

            if (responseData.data.medical_case) {
                dispatch(addNewCaseToMyList(responseData.data.medical_case));
                dispatch(setNewToBePaidCase(responseData.data.medical_case));
            }

            dispatch(newCaseActionFinish());
        } catch (error) {
            console.log("error:", error);

            if (error.response) {
                toast.error(error.response.data.error_message);
            } else {
                toast.error(error.message);
            }

            dispatch(newCaseActionError());
        }
    };
};
