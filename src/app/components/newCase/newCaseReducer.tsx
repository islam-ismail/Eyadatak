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

export const initialNewCaseState: NewCaseState = {
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

export const setPrimarySpecialities = (
    state: NewCaseState,
    action: newCaseTypes.SetPrimarySpecialitiesAction
) => {
    return {
        ...state,
        primarySpecialities: action.payload
    };
};

export const setSecondarySpecialities = (
    state: NewCaseState,
    action: newCaseTypes.SetSecondarySpecialitiesAction
) => {
    return {
        ...state,
        secondarySpecialities: action.payload
    };
};

export const setInitialRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.SetInitialRequiredQuestionsAction
) => {
    return {
        ...state,
        initialRequiredQuestions: action.payload
    };
};

export const setRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.SetRequiredQuestionsAction
) => {
    return {
        ...state,
        requiredQuestions: action.payload
    };
};

export const setInitialNotRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.SetInitialNotRequiredQuestionsAction
) => {
    return {
        ...state,
        initialNotRequiredQuestions: action.payload
    };
};

export const setNotRequiredQuestions = (
    state: NewCaseState,
    action: newCaseTypes.SetNotRequiredQuestionsAction
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
>(initialNewCaseState, {
    [newCaseConstants.NEW_CASE_ACTION_START]: newCaseActionStarted,
    [newCaseConstants.NEW_CASE_ACTION_FINISH]: newCaseActionFinished,
    [newCaseConstants.NEW_CASE_ACTION_ERROR]: newCaseActionError,
    [newCaseConstants.SET_PRIMARY_SPECIALITIES]: setPrimarySpecialities,
    [newCaseConstants.SET_SECONDARY_SPECIALITIES]: setSecondarySpecialities,
    [newCaseConstants.SET_INITIAL_REQUIRED_QUESTIONS]: setInitialRequiredQuestions,
    [newCaseConstants.SET_REQUIRED_QUESTIONS]: setRequiredQuestions,
    [newCaseConstants.SET_INITIAL_NOT_REQUIRED_QUESTIONS]: setInitialNotRequiredQuestions,
    [newCaseConstants.SET_NOT_REQUIRED_QUESTIONS]: setNotRequiredQuestions
});
