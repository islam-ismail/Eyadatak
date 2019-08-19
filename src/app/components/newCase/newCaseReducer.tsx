import { createReducer } from "../../reducers/reducerUtil";
import * as newCaseConstants from "./newCaseConstants";
import { Speciality } from "../../types/models/Speciality";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import * as newCaseTypes from "./newCaseTypes";

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

export const newCaseActionStarted = (state: NewCaseState) => {
    return {
        ...state,
        loading: true
    };
};

export const newCaseActionFinished = (state: NewCaseState) => {
    return {
        ...state,
        loading: false
    };
};

export const newCaseActionError = (state: NewCaseState) => {
    return {
        ...state,
        loading: false
    };
};

export const getPrimarySpecialities = (
    state: NewCaseState,
    action: newCaseTypes.GetPrimarySpecialitiesAction
) => {
    return {
        ...state,
        primarySpecialities: action.payload
    };
};

export const getSecondarySpecialities = (
    state: NewCaseState,
    action: newCaseTypes.GetSecondarySpecialitiesAction
) => {
    return {
        ...state,
        secondarySpecialities: action.payload
    };
};

export const getInitialRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.GetInitialRequiredQuestionsAction
) => {
    return {
        ...state,
        initialRequiredQuestions: action.payload
    };
};

export const getRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.GetRequiredQuestionsAction
) => {
    return {
        ...state,
        requiredQuestions: action.payload
    };
};

export const getInitialNotRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.GetInitialNotRequiredQuestionsAction
) => {
    return {
        ...state,
        initialNotRequiredQuestions: action.payload
    };
};

export const getNotRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.GetNotRequiredQuestionsAction
) => {
    return {
        ...state,
        notRequiredQuestions: action.payload
    };
};

export default createReducer<
    NewCaseState,
    newCaseConstants.NewCaseActionTypes,
    newCaseTypes.NewCaseActions
>(initialState, {
    [newCaseConstants.NEW_CASE_ACTION_START]: newCaseActionStarted,
    [newCaseConstants.NEW_CASE_ACTION_FINISH]: newCaseActionFinished,
    [newCaseConstants.NEW_CASE_ACTION_ERROR]: newCaseActionError,
    [newCaseConstants.GET_PRIMARY_SPECIALITIES]: getPrimarySpecialities,
    [newCaseConstants.GET_SECONDARY_SPECIALITIES]: getSecondarySpecialities,
    [newCaseConstants.GET_INITIAL_REQUIRED_QUESTIONS]: getInitialRequiredQuestions,
    [newCaseConstants.GET_REQUIRED_QUESTIONS]: getRequiredQuestions,
    [newCaseConstants.GET_INITIAL_NOT_REQUIRED_QUESTIONS]: getInitialNotRequiredQuestions,
    [newCaseConstants.GET_NOT_REQUIRED_QUESTIONS]: getNotRequiredQuestions
});
