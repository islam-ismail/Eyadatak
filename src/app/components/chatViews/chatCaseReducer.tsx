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

const initialState: ChatCaseState = {
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

export const getCaseChatData = (
    state: ChatCaseState,
    action: chatCaseTypes.GetCaseChatDataAction
) => {
    return {
        ...state,
        caseChatData: action.payload.replies,
        caseUnansweredQuestions: action.payload.questions,
        lastReplyId: action.payload.lastReplyId
    };
};

export const getCaseDoctor = (state: ChatCaseState, action: chatCaseTypes.GetCaseDoctorAction) => {
    return {
        ...state,
        caseDoctor: action.payload
    };
};

export const getCasePatient = (
    state: ChatCaseState,
    action: chatCaseTypes.GetCasePatientAction
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
>(initialState, {
    [chatCaseConstants.CHAT_CASE_ACTION_START]: chatCaseActionStarted,
    [chatCaseConstants.CHAT_CASE_ACTION_FINISH]: chatCaseActionFinished,
    [chatCaseConstants.CHAT_CASE_ACTION_ERROR]: chatCaseActionError,
    [chatCaseConstants.GET_CASE_REPLIES]: getCaseChatData,
    [chatCaseConstants.GET_CASE_DOCTOR]: getCaseDoctor,
    [chatCaseConstants.GET_CASE_PATIENT]: getCasePatient
});
