import { createReducer } from "../../../reducers/reducerUtil";
import {
    HISTORY_CASE_ACTION_START,
    HISTORY_CASE_ACTION_FINISH,
    HISTORY_CASE_ACTION_ERROR,
    GET_HISTORY_CASE_REPLIES
} from "./historyCaseConstants";
import { CaseChatElement } from "../chatCaseTypes";

export interface HistoryCaseState {
    historyCaseChatData: CaseChatElement[];
    loading?: boolean;
}

const initialState: HistoryCaseState = {
    historyCaseChatData: [],
    loading: false
};

export const historyCaseActionStarted = (
    state: HistoryCaseState,
    payload: any
): HistoryCaseState => {
    return {
        ...state,
        loading: true
    };
};

export const historyCaseActionFinished = (
    state: HistoryCaseState,
    payload: any
): HistoryCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const historyCaseActionError = (state: HistoryCaseState, payload: any): HistoryCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const getHistoryCaseChatData = (
    state: HistoryCaseState,
    payload: CaseChatElement[]
): HistoryCaseState => {
    return {
        ...state,
        historyCaseChatData: payload
    };
};

export default createReducer(initialState, {
    [HISTORY_CASE_ACTION_START]: historyCaseActionStarted,
    [HISTORY_CASE_ACTION_FINISH]: historyCaseActionFinished,
    [HISTORY_CASE_ACTION_ERROR]: historyCaseActionError,
    [GET_HISTORY_CASE_REPLIES]: getHistoryCaseChatData
});
