import { createReducer } from "../../../reducers/reducerUtil";
import * as historyCaseConstants from "./historyCaseConstants";
import { CaseChatElement } from "../chatCaseTypes";
import { SetHistoryCaseChatDataAction, HistoryCaseActions } from "./historyCaseTypes";

export interface HistoryCaseState {
    historyCaseChatData: CaseChatElement[];
    loading?: boolean;
}

export const initialHistoryCaseState: HistoryCaseState = {
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

export const setHistoryCaseChatData = (
    state: HistoryCaseState,
    action: SetHistoryCaseChatDataAction
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
>(initialHistoryCaseState, {
    [historyCaseConstants.HISTORY_CASE_ACTION_START]: historyCaseActionStarted,
    [historyCaseConstants.HISTORY_CASE_ACTION_FINISH]: historyCaseActionFinished,
    [historyCaseConstants.HISTORY_CASE_ACTION_ERROR]: historyCaseActionError,
    [historyCaseConstants.SET_HISTORY_CASE_REPLIES]: setHistoryCaseChatData
});
