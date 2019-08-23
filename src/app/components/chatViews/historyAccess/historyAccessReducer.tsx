import { createReducer } from "../../../reducers/reducerUtil";
import * as historyAccessConstants from "./historyAccessConstants";
import { MedicalCase } from "../../../types/models/MedicalCase";
import { HistoryAccessActions } from "./historyAccessTypes";
import { CaseChatElement } from "../chatCaseTypes";

export interface HistoryAccessState {
    historyCases: MedicalCase[];
    allAccessRequests: CaseChatElement[];
    requestStatus: string;
    accessLevel: string;
    historyAccessId: number;
    waitingApproval: boolean;
    waitingLevel: string;
    loading?: boolean;
}

export const initialHistoryAccessState: HistoryAccessState = {
    historyCases: [],
    allAccessRequests: [],
    requestStatus: "",
    accessLevel: "",
    historyAccessId: 0,
    waitingApproval: false,
    waitingLevel: ""
};

export const historyAccessActionStarted = (state: HistoryAccessState): HistoryAccessState => {
    return {
        ...state,
        loading: true
    };
};

export const historyAccessActionFinished = (state: HistoryAccessState): HistoryAccessState => {
    return {
        ...state,
        loading: false
    };
};

export const historyAccessActionError = (state: HistoryAccessState): HistoryAccessState => {
    return {
        ...state,
        loading: false
    };
};

export const requestFullHistoryAccess = (state: HistoryAccessState): HistoryAccessState => {
    return {
        ...state
    };
};

export const requestSpcialityAccess = (state: HistoryAccessState): HistoryAccessState => {
    return {
        ...state
    };
};

export const setRequestStatus = (
    state: HistoryAccessState,
    payload: HistoryAccessState
): HistoryAccessState => {
    return {
        ...state,
        requestStatus: payload.requestStatus,
        accessLevel: payload.accessLevel,
        historyAccessId: payload.historyAccessId,
        waitingApproval: payload.waitingApproval,
        waitingLevel: payload.waitingLevel,
        allAccessRequests: payload.allAccessRequests
    };
};

export const setApprovedHistoryCases = (
    state: HistoryAccessState,
    payload: MedicalCase[]
): HistoryAccessState => {
    return {
        ...state,
        historyCases: payload
    };
};

export default createReducer<
    HistoryAccessState,
    historyAccessConstants.HistoryAccessActionTypes,
    HistoryAccessActions
>(initialHistoryAccessState, {
    [historyAccessConstants.HISTORY_ACCESS_ACTION_START]: historyAccessActionStarted,
    [historyAccessConstants.HISTORY_ACCESS_ACTION_FINISH]: historyAccessActionFinished,
    [historyAccessConstants.HISTORY_ACCESS_ACTION_ERROR]: historyAccessActionError,
    [historyAccessConstants.REQUEST_FULL_ACCESS]: requestFullHistoryAccess,
    [historyAccessConstants.REQUEST_SPECIALITY_ACCESS]: requestSpcialityAccess,
    [historyAccessConstants.SET_REQUEST_STATUS_AND_ACCESS_LEVEL]: setRequestStatus,
    [historyAccessConstants.SET_HISTORY_CASES]: setApprovedHistoryCases
});
