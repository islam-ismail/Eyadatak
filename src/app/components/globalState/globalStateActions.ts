import {
    ASYNC_ACTION_START,
    ASYNC_ACTION_FINISH,
    ASYNC_ACTION_ERROR,
    SWITCH_TO_ARABIC,
    SWITCH_TO_ENGLISH,
    SET_LOCALE
} from "./globalStateConstants";
import { AppAction } from "../../types/app-action";
import { setLocaleAction } from "./globalStateTypes";

export const asyncActionStart = (): AppAction => {
    return {
        type: ASYNC_ACTION_START,
        excludeRefresh: true
    };
};

export const asyncActionFinish = (): AppAction => {
    return {
        type: ASYNC_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const asyncActionError = (): AppAction => {
    return {
        type: ASYNC_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const switchToArabic = (): AppAction => {
    return {
        type: SWITCH_TO_ARABIC,
        excludeRefresh: true
    };
};

export const switchToEnglish = (): AppAction => {
    return {
        type: SWITCH_TO_ENGLISH,
        excludeRefresh: true
    };
};

export const setLocale = (locale: string): setLocaleAction => {
    return {
        type: SET_LOCALE,
        payload: locale,
        excludeRefresh: true
    };
};
