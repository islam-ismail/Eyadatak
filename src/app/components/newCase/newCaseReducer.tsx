import { createReducer } from "../../reducers/reducerUtil";
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
import { Speciality } from "../../types/models/Speciality";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";

export interface NewCaseState {
    primarySpecialities: Speciality[];
    secondarySpecialities: Speciality[];
    initialRequiredQuestions: QuestionTemplate[];
    requiredQuestions: QuestionTemplate[];
    initialNotRequiredQuestions: QuestionTemplate[];
    notRequiredQuestions: QuestionTemplate[];
    loading: boolean;
}

const initialState: NewCaseState = {
    primarySpecialities: [],
    secondarySpecialities: [],
    initialRequiredQuestions: [],
    requiredQuestions: [],
    initialNotRequiredQuestions: [],
    notRequiredQuestions: [],
    loading: false
};

export const newCaseActionStarted = (state: NewCaseState, payload: any) => {
    return {
        ...state,
        loading: true
    };
};

export const newCaseActionFinished = (state: NewCaseState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const newCaseActionError = (state: NewCaseState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const getPrimarySpecialities = (state: NewCaseState, payload: Speciality[]) => {
    return {
        ...state,
        primarySpecialities: payload
    };
};

export const getSecondarySpecialities = (state: NewCaseState, payload: Speciality[]) => {
    return {
        ...state,
        secondarySpecialities: payload
    };
};

export const getInitialRequiredQuestions = (state: NewCaseState, payload: QuestionTemplate[]) => {
    return {
        ...state,
        initialRequiredQuestions: payload
    };
};

export const getRequiredQuestions = (state: NewCaseState, payload: QuestionTemplate[]) => {
    return {
        ...state,
        requiredQuestions: payload
    };
};

export const getInitialNotRequiredQuestions = (
    state: NewCaseState,
    payload: QuestionTemplate[]
) => {
    return {
        ...state,
        initialNotRequiredQuestions: payload
    };
};

export const getNotRequiredQuestions = (state: NewCaseState, payload: QuestionTemplate[]) => {
    return {
        ...state,
        notRequiredQuestions: payload
    };
};

export default createReducer(initialState, {
    [NEW_CASE_ACTION_START]: newCaseActionStarted,
    [NEW_CASE_ACTION_FINISH]: newCaseActionFinished,
    [NEW_CASE_ACTION_ERROR]: newCaseActionError,
    [GET_PRIMARY_SPECIALITIES]: getPrimarySpecialities,
    [GET_SECONDARY_SPECIALITIES]: getSecondarySpecialities,
    [GET_INITIAL_REQUIRED_QUESTIONS]: getInitialRequiredQuestions,
    [GET_REQUIRED_QUESTIONS]: getRequiredQuestions,
    [GET_INITIAL_NOT_REQUIRED_QUESTIONS]: getInitialNotRequiredQuestions,
    [GET_NOT_REQUIRED_QUESTIONS]: getNotRequiredQuestions
});
