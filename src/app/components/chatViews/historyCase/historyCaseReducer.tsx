import { createReducer } from "../../../reducers/reducerUtil";
import * as historyCaseConstants from "./historyCaseConstants";
import { CaseChatElement } from "../chatCaseTypes";
import { GetHistoryCaseChatDataAction, HistoryCaseActions } from "./historyCaseTypes";

export interface HistoryCaseState {
    historyCaseChatData: CaseChatElement[];
    loading?: boolean;
}

const initialState: HistoryCaseState = {
    historyCaseChatData: [],
    loading: false
};

export const historyCaseActionStarted = (state: HistoryCaseState): HistoryCaseState => {
    return {
        ...state,
        loading: true
    };
};

export const historyCaseActionFinished = (state: HistoryCaseState): HistoryCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const historyCaseActionError = (state: HistoryCaseState): HistoryCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const getHistoryCaseChatData = (
    state: HistoryCaseState,
    action: GetHistoryCaseChatDataAction
): HistoryCaseState => {
    return {
        ...state,
        historyCaseChatData: action.payload
    };
};

export default createReducer<
    HistoryCaseState,
    historyCaseConstants.HistoryCaseActionTypes,
    HistoryCaseActions
>(initialState, {
    [historyCaseConstants.HISTORY_CASE_ACTION_START]: historyCaseActionStarted,
    [historyCaseConstants.HISTORY_CASE_ACTION_FINISH]: historyCaseActionFinished,
    [historyCaseConstants.HISTORY_CASE_ACTION_ERROR]: historyCaseActionError,
    [historyCaseConstants.GET_HISTORY_CASE_REPLIES]: getHistoryCaseChatData
});
