import { createReducer } from "../../reducers/reducerUtil";
import { Doctor } from "../../types/models/Doctor";
import { User } from "../../types/models/User";
import * as chatCaseConstants from "./chatCaseConstants";
import * as chatCaseTypes from "./chatCaseTypes";

export interface ChatCaseState {
    caseChatData: chatCaseTypes.CaseChatElement[];
    caseUnansweredQuestions: chatCaseTypes.CaseChatElement[];
    caseDoctor: Doctor | null;
    loading: boolean;
    casePatient?: User;
    lastReplyId?: number;
}

export const initialChatCaseState: ChatCaseState = {
    caseChatData: [],
    caseUnansweredQuestions: [],
    caseDoctor: null,
    loading: false
};

export const chatCaseActionStarted = (state: ChatCaseState) => {
    return {
        ...state,
        loading: true
    };
};

export const chatCaseActionFinished = (state: ChatCaseState) => {
    return {
        ...state,
        loading: false
    };
};

export const chatCaseActionError = (state: ChatCaseState) => {
    return {
        ...state,
        loading: false
    };
};

export const setCaseChatData = (
    state: ChatCaseState,
    action: chatCaseTypes.SetCaseChatDataAction
) => {
    return {
        ...state,
        caseChatData: action.payload.replies,
        caseUnansweredQuestions: action.payload.questions,
        lastReplyId: action.payload.lastReplyId
    };
};

export const setCaseDoctor = (state: ChatCaseState, action: chatCaseTypes.SetCaseDoctorAction) => {
    return {
        ...state,
        caseDoctor: action.payload
    };
};

export const setCasePatient = (
    state: ChatCaseState,
    action: chatCaseTypes.SetCasePatientAction
) => {
    return {
        ...state,
        casePatient: action.payload
    };
};

export default createReducer<
    ChatCaseState,
    chatCaseConstants.ChatCaseActionTypes,
    chatCaseTypes.ChatCaseActions
>(initialChatCaseState, {
    [chatCaseConstants.CHAT_CASE_ACTION_START]: chatCaseActionStarted,
    [chatCaseConstants.CHAT_CASE_ACTION_FINISH]: chatCaseActionFinished,
    [chatCaseConstants.CHAT_CASE_ACTION_ERROR]: chatCaseActionError,
    [chatCaseConstants.SET_CASE_REPLIES]: setCaseChatData,
    [chatCaseConstants.SET_CASE_DOCTOR]: setCaseDoctor,
    [chatCaseConstants.SET_CASE_PATIENT]: setCasePatient
});
