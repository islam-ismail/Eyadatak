import { AppAction } from "../../types/app-action";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Speciality } from "../../types/models/Speciality";
import {
    GET_INITIAL_NOT_REQUIRED_QUESTIONS,
    GET_INITIAL_REQUIRED_QUESTIONS,
    GET_NOT_REQUIRED_QUESTIONS,
    GET_PRIMARY_SPECIALITIES,
    GET_REQUIRED_QUESTIONS,
    GET_SECONDARY_SPECIALITIES
} from "./newCaseConstants";

export interface GetPrimarySpecialitiesAction extends AppAction {
    type: typeof GET_PRIMARY_SPECIALITIES;
    payload: Speciality[];
}

export interface GetSecondarySpecialitiesAction extends AppAction {
    type: typeof GET_SECONDARY_SPECIALITIES;
    payload: Speciality[];
}

export interface GetInitialRequiredQuestionsAction extends AppAction {
    type: typeof GET_INITIAL_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface GetRequiredQuestionsAction extends AppAction {
    type: typeof GET_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface GetInitialNotRequiredQuestionsAction extends AppAction {
    type: typeof GET_INITIAL_NOT_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface GetNotRequiredQuestionsAction extends AppAction {
    type: typeof GET_NOT_REQUIRED_QUESTIONS;
    payload: QuestionTemplate[];
}
