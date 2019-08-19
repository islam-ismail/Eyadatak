import { AppAction } from "../../types/app-action";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Speciality } from "../../types/models/Speciality";
import * as newCaseConstants from "./newCaseConstants";
import { Dispatch } from "redux";

/**
 * actions signature
 */
export interface GetPrimarySpecialitiesAction extends AppAction {
    type: typeof newCaseConstants.GET_PRIMARY_SPECIALITIES;
    payload: Speciality[];
}

export interface GetSecondarySpecialitiesAction extends AppAction {
    type: typeof newCaseConstants.GET_SECONDARY_SPECIALITIES;
    payload: Speciality[];
}

export interface GetInitialRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.GET_INITIAL_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface GetRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.GET_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface GetInitialNotRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.GET_INITIAL_NOT_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface GetNotRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.GET_NOT_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface NewCaseActionStartAction extends AppAction {
    type: typeof newCaseConstants.NEW_CASE_ACTION_START;
}

export interface NewCaseActionFinishAction extends AppAction {
    type: typeof newCaseConstants.NEW_CASE_ACTION_FINISH;
}

export interface NewCaseActionErrorAction extends AppAction {
    type: typeof newCaseConstants.NEW_CASE_ACTION_ERROR;
}

export type NewCaseActions = GetPrimarySpecialitiesAction &
    GetSecondarySpecialitiesAction &
    GetInitialRequiredQuestionsAction &
    GetRequiredQuestionsAction &
    GetInitialNotRequiredQuestionsAction &
    GetNotRequiredQuestionsAction &
    NewCaseActionStartAction &
    NewCaseActionFinishAction &
    NewCaseActionErrorAction;

/**
 * action creators signature
 */
export type addNewCaseSig = (
    specialityId: number,
    questionDescription: string,
    patientId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type getInitialQuestionValuesSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncGetNotRequiredQuestionsSig = (
    specialityId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncGetInitialNotRequiredQuestionsSig = () => (
    dispatch: Dispatch<AppAction>
) => Promise<void>;

export type asyncGetRequiredQuestionsSig = (
    specialityId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncGetInitialRequiredQuestionsSig = () => (
    dispatch: Dispatch<AppAction>
) => Promise<void>;

export type asyncGetSecondarySpecialitiesSig = (
    parentId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncGetPrimarySpecialitiesSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface NewCaseActionsSignatures {
    addNewCase: (
        specialityId: number,
        questionDescription: string,
        patientId: number
    ) => Promise<void>;
    getInitialQuestionValues: () => Promise<void>;
    asyncGetNotRequiredQuestions: (specialityId: number) => Promise<void>;
    asyncGetInitialNotRequiredQuestions: () => Promise<void>;
    asyncGetRequiredQuestions: (specialityId: number) => Promise<void>;
    asyncGetInitialRequiredQuestions: () => Promise<void>;
    asyncGetSecondarySpecialities: (parentId: number) => Promise<void>;
    asyncGetPrimarySpecialities: () => Promise<void>;
}
