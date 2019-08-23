import { AppAction } from "../../types/app-action";
import * as questionTemplateConstants from "./questionTemplateConstants";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface SetSavedQuestionsAction extends AppAction {
    type: typeof questionTemplateConstants.SET_SAVED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface AddQuestionToTemplateAction extends AppAction {
    type: typeof questionTemplateConstants.ADD_QUESTION_TO_TEMPLATE;
    payload: QuestionTemplate;
}

export interface SendCaseQuestionsAction extends AppAction {
    type: typeof questionTemplateConstants.SEND_CASE_QUESTIONS;
    excludeRefresh: boolean;
}

export interface QuestionTemplateActionStartedAction extends AppAction {
    type: typeof questionTemplateConstants.QUESTION_TEMPLATE_ACTION_START;
    excludeRefresh: boolean;
}
export interface QuestionTemplateActionFinishedAction extends AppAction {
    type: typeof questionTemplateConstants.QUESTION_TEMPLATE_ACTION_FINISH;
    excludeRefresh: boolean;
}
export interface QuestionTemplateActionErrorAction extends AppAction {
    type: typeof questionTemplateConstants.QUESTION_TEMPLATE_ACTION_ERROR;
    excludeRefresh: boolean;
}

export type QuestionTemplateActionActions = SetSavedQuestionsAction &
    AddQuestionToTemplateAction &
    SendCaseQuestionsAction &
    QuestionTemplateActionStartedAction &
    QuestionTemplateActionFinishedAction &
    QuestionTemplateActionErrorAction;

export type setSavedQuestionsListSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type saveNewQuestionSig = (
    questionText: string,
    questionType: string,
    answerOptions: string[],
    addNewQuestionToTemplate: boolean
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type sendCaseTemplateQuestionsSig = (
    questionIds: number[],
    caseId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface QuestionTemplateActionsSignatures {
    setSavedQuestions: (savedQuestions: QuestionTemplate[]) => SetSavedQuestionsAction;
    addQuestionToTemplate: (questionToAdd: QuestionTemplate) => AddQuestionToTemplateAction;
    sendCaseQuestions: () => SendCaseQuestionsAction;
    questionTemplateActionStart: () => QuestionTemplateActionStartedAction;
    questionTemplateActionFinish: () => QuestionTemplateActionFinishedAction;
    questionTemplateActionError: () => QuestionTemplateActionErrorAction;

    setSavedQuestionsList: () => Promise<void>;

    saveNewQuestion: (
        questionText: string,
        questionType: string,
        answerOptions: string[],
        addNewQuestionToTemplate: boolean
    ) => Promise<void>;

    sendCaseTemplateQuestions: (questionIds: number[], caseId: number) => Promise<void>;
}
