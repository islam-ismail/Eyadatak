import { createReducer } from "../../../reducers/reducerUtil";
import {
    HISTORY_ACCESS_ACTION_START,
    HISTORY_ACCESS_ACTION_FINISH,
    HISTORY_ACCESS_ACTION_ERROR,
    REQUEST_FULL_ACCESS,
    REQUEST_SPECIALITY_ACCESS,
    GET_REQUEST_STATUS_AND_ACCESS_LEVEL,
    GET_HISTORY_CASES
} from "./historyAccessConstants";
import { PatientHistoryAccess } from "../../../types/models/PatientHistoryAccess";
import { MedicalCase } from "../../../types/models/MedicalCase";

export interface HistoryAccessState {
    historyCases: MedicalCase[];
    allAccessRequests: PatientHistoryAccess[];
    requestStatus: string;
    accessLevel: string;
    historyAccessId: number;
    waitingApproval: boolean;
    waitingLevel: string;
    loading?: boolean;
}

const initialState: HistoryAccessState = {
    historyCases: [],
    allAccessRequests: [],
    requestStatus: "",
    accessLevel: "",
    historyAccessId: 0,
    waitingApproval: false,
    waitingLevel: ""
};

export const historyAccessActionStarted = (
    state: HistoryAccessState,
    payload: any
): HistoryAccessState => {
    return {
        ...state,
        loading: true
    };
};

export const historyAccessActionFinished = (
    state: HistoryAccessState,
    payload: any
): HistoryAccessState => {
    return {
        ...state,
        loading: false
    };
};

export const historyAccessActionError = (
    state: HistoryAccessState,
    payload: any
): HistoryAccessState => {
    return {
        ...state,
        loading: false
    };
};

export const requestFullHistoryAccess = (
    state: HistoryAccessState,
    payload: any
): HistoryAccessState => {
    return {
        ...state
    };
};

export const requestSpcialityAccess = (
    state: HistoryAccessState,
    payload: any
): HistoryAccessState => {
    return {
        ...state
    };
};

export const getRequestStatus = (
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

export const getApprovedHistoryCases = (
    state: HistoryAccessState,
    payload: MedicalCase[]
): HistoryAccessState => {
    return {
        ...state,
        historyCases: payload
    };
};

export default createReducer(initialState, {
    [HISTORY_ACCESS_ACTION_START]: historyAccessActionStarted,
    [HISTORY_ACCESS_ACTION_FINISH]: historyAccessActionFinished,
    [HISTORY_ACCESS_ACTION_ERROR]: historyAccessActionError,
    [REQUEST_FULL_ACCESS]: requestFullHistoryAccess,
    [REQUEST_SPECIALITY_ACCESS]: requestSpcialityAccess,
    [GET_REQUEST_STATUS_AND_ACCESS_LEVEL]: getRequestStatus,
    [GET_HISTORY_CASES]: getApprovedHistoryCases
});
