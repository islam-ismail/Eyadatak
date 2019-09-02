import { createReducer } from "../../reducers/reducerUtil";
import {
    ASYNC_ACTION_START,
    ASYNC_ACTION_FINISH,
    ASYNC_ACTION_ERROR,
    SWITCH_TO_ARABIC,
    SWITCH_TO_ENGLISH,
    SET_LOCALE,
    GlobalStateActionTypes
} from "./globalStateConstants";
import { GlobalStateActions, setLocaleAction } from "./globalStateTypes";

export interface GlobalState {
    locale: string;
    loading: boolean;
}

export const initialGlobalState: GlobalState = {
    locale: "ar",
    loading: false
};

export const asynActionStarted = (state: GlobalState) => {
    return {
        ...state,
        loading: true
    };
};

export const asynActionFinished = (state: GlobalState) => {
    return {
        ...state,
        loading: false
    };
};

export const asynActionError = (state: GlobalState) => {
    return {
        ...state,
        loading: false
    };
};

export const switchToArabic = (state: GlobalState) => {
    return {
        ...state,
        locale: "ar"
    };
};

export const switchToEnglish = (state: GlobalState) => {
    return {
        ...state,
        locale: "en"
    };
};

export const setLocale = (state: GlobalState, action: setLocaleAction) => {
    return {
        ...state,
        locale: action.payload
    };
};

export default createReducer<GlobalState, GlobalStateActionTypes, GlobalStateActions>(
    initialGlobalState,
    {
        [ASYNC_ACTION_START]: asynActionStarted,
        [ASYNC_ACTION_FINISH]: asynActionFinished,
        [ASYNC_ACTION_ERROR]: asynActionError,
        [SWITCH_TO_ARABIC]: switchToArabic,
        [SWITCH_TO_ENGLISH]: switchToEnglish,
        [SET_LOCALE]: setLocale
    }
);
