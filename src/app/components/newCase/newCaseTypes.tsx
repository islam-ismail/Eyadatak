import { AppAction } from "../../types/app-action";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Speciality } from "../../types/models/Speciality";
import * as newCaseConstants from "./newCaseConstants";
import { Dispatch } from "redux";
import { MedicalCase } from "../../types/models/MedicalCase";

/**
 * actions signature
 */
export interface SetPrimarySpecialitiesAction extends AppAction {
    type: typeof newCaseConstants.SET_PRIMARY_SPECIALITIES;
    payload: Speciality[];
}

export interface SetSecondarySpecialitiesAction extends AppAction {
    type: typeof newCaseConstants.SET_SECONDARY_SPECIALITIES;
    payload: Speciality[];
}

export interface SetInitialRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.SET_INITIAL_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface SetRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.SET_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface SetInitialNotRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.SET_INITIAL_NOT_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface SetNotRequiredQuestionsAction extends AppAction {
    type: typeof newCaseConstants.SET_NOT_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface NewCaseActionStartAction extends AppAction {
    type: typeof newCaseConstants.NEW_CASE_ACTION_START;
    excludeRefresh: boolean;
}

export interface NewCaseActionFinishAction extends AppAction {
    type: typeof newCaseConstants.NEW_CASE_ACTION_FINISH;
    excludeRefresh: boolean;
}

export interface NewCaseActionErrorAction extends AppAction {
    type: typeof newCaseConstants.NEW_CASE_ACTION_ERROR;
}

export type NewCaseActions = SetPrimarySpecialitiesAction &
    SetSecondarySpecialitiesAction &
    SetInitialRequiredQuestionsAction &
    SetRequiredQuestionsAction &
    SetInitialNotRequiredQuestionsAction &
    SetNotRequiredQuestionsAction &
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

export type setInitialQuestionValuesSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncSetNotRequiredQuestionsSig = (
    specialityId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncSetInitialNotRequiredQuestionsSig = () => (
    dispatch: Dispatch<AppAction>
) => Promise<void>;

export type asyncSetRequiredQuestionsSig = (
    specialityId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncSetInitialRequiredQuestionsSig = () => (
    dispatch: Dispatch<AppAction>
) => Promise<void>;

export type asyncSetSecondarySpecialitiesSig = (
    parentId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncSetPrimarySpecialitiesSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface NewCaseActionsSignatures {
    addNewCase: (
        specialityId: number,
        questionDescription: string,
        patientId: number
    ) => Promise<void>;
    setInitialQuestionValues: () => Promise<void>;
    asyncSetNotRequiredQuestions: (specialityId: number) => Promise<void>;
    asyncSetInitialNotRequiredQuestions: () => Promise<void>;
    asyncSetRequiredQuestions: (specialityId: number) => Promise<void>;
    asyncSetInitialRequiredQuestions: () => Promise<void>;
    asyncSetSecondarySpecialities: (parentId: number) => Promise<void>;
    asyncSetPrimarySpecialities: () => Promise<void>;
}
