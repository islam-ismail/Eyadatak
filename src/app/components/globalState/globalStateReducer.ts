import { createReducer } from "../../reducers/reducerUtil";
import {
    ASYNC_ACTION_START,
    ASYNC_ACTION_FINISH,
    ASYNC_ACTION_ERROR,
    SWITCH_TO_ARABIC,
    SWITCH_TO_ENGLISH,
    SET_LOCALE
} from "./globalStateConstants";

export interface GlobalState {
    locale: string;
    loading: boolean;
}

const initialState: GlobalState = {
    locale: "en",
    loading: false
};

export const asynActionStarted = (state: GlobalState, payload: any) => {
    return {
        ...state,
        loading: true
    };
};

export const asynActionFinished = (state: GlobalState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const asynActionError = (state: GlobalState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const switchToArabic = (state: GlobalState, payload: any) => {
    return {
        ...state,
        locale: "ar"
    };
};

export const switchToEnglish = (state: GlobalState, payload: any) => {
    return {
        ...state,
        locale: "en"
    };
};

export const setLocale = (state: GlobalState, payload: string) => {
    return {
        ...state,
        locale: payload
    };
};

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asynActionStarted,
    [ASYNC_ACTION_FINISH]: asynActionFinished,
    [ASYNC_ACTION_ERROR]: asynActionError,
    [SWITCH_TO_ARABIC]: switchToArabic,
    [SWITCH_TO_ENGLISH]: switchToEnglish,
    [SET_LOCALE]: setLocale
});
