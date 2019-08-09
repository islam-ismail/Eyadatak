import { createReducer } from "../../reducers/reducerUtil";
import {
    CHAT_CASE_ACTION_START,
    CHAT_CASE_ACTION_FINISH,
    CHAT_CASE_ACTION_ERROR,
    GET_CASE_REPLIES,
    GET_CASE_DOCTOR,
    GET_CASE_PATIENT
} from "./chatCaseConstants";
import { Doctor } from "../../types/models/Doctor";
import { User } from "../../types/models/User";
import { CaseReply } from "../../types/models/CaseReply";
import { CaseQuestion } from "../../types/models/CaseQuestion";
import { CaseChatElement } from "./chatCaseTypes";

export interface ChatCaseState {
    caseChatData: CaseChatElement[];
    caseUnansweredQuestions: CaseQuestion[];
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

export const chatCaseActionStarted = (state: ChatCaseState, payload: any) => {
    return {
        ...state,
        loading: true
    };
};

export const chatCaseActionFinished = (state: ChatCaseState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const chatCaseActionError = (state: ChatCaseState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const getCaseChatData = (
    state: ChatCaseState,
    payload: { replies: CaseChatElement[]; questions: CaseQuestion[]; lastReplyId: number }
) => {
    return {
        ...state,
        caseChatData: payload.replies,
        caseUnansweredQuestions: payload.questions,
        lastReplyId: payload.lastReplyId
    };
};

export const getCaseDoctor = (state: ChatCaseState, payload: Doctor) => {
    return {
        ...state,
        caseDoctor: payload
    };
};

export const getCasePatient = (state: ChatCaseState, payload: User) => {
    return {
        ...state,
        casePatient: payload
    };
};

export default createReducer(initialState, {
    [CHAT_CASE_ACTION_START]: chatCaseActionStarted,
    [CHAT_CASE_ACTION_FINISH]: chatCaseActionFinished,
    [CHAT_CASE_ACTION_ERROR]: chatCaseActionError,
    [GET_CASE_REPLIES]: getCaseChatData,
    [GET_CASE_DOCTOR]: getCaseDoctor,
    [GET_CASE_PATIENT]: getCasePatient
});
