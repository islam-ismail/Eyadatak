import { AppAction } from "../../types/app-action";
import { GET_SAVED_QUESTIONS, ADD_QUESTION_TO_TEMPLATE } from "./questionTemplateConstants";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";

export interface GetSavedQuestionsAction extends AppAction {
    type: typeof GET_SAVED_QUESTIONS;
    payload: QuestionTemplate[];
}

export interface AddQuestionToTemplateAction extends AppAction {
    type: typeof ADD_QUESTION_TO_TEMPLATE;
    payload: QuestionTemplate;
}
