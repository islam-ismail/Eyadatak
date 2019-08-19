import {
    SET_LOCALE,
    SWITCH_TO_ENGLISH,
    SWITCH_TO_ARABIC,
    ASYNC_ACTION_ERROR,
    ASYNC_ACTION_FINISH,
    ASYNC_ACTION_START
} from "./globalStateConstants";
import { AppAction } from "../../types/app-action";

export interface setLocaleAction extends AppAction {
    type: typeof SET_LOCALE;
    payload: string;
    excludeRefresh: boolean;
}

export interface asynActionStartedAction extends AppAction {
    type: typeof ASYNC_ACTION_START;
}

export interface asynActionFinishedAction extends AppAction {
    type: typeof ASYNC_ACTION_FINISH;
}

export interface asynActionErrorAction extends AppAction {
    type: typeof ASYNC_ACTION_ERROR;
}

export interface switchToArabicAction extends AppAction {
    type: typeof SWITCH_TO_ARABIC;
}

export interface switchToEnglishAction extends AppAction {
    type: typeof SWITCH_TO_ENGLISH;
}

export type GlobalStateActions = setLocaleAction &
    asynActionStartedAction &
    asynActionFinishedAction &
    asynActionErrorAction &
    switchToArabicAction &
    switchToEnglishAction;

export type setLocaleSig = (locale: string) => setLocaleAction;
export type switchToEnglishSig = () => switchToEnglishAction;
export type switchToArabicSig = () => switchToArabicAction;
export type asyncActionErrorSig = () => asynActionErrorAction;
export type asyncActionFinishSig = () => asynActionFinishedAction;
export type asyncActionStartSig = () => asynActionStartedAction;

export interface GlobalStateActionSignatures {
    setLocale: setLocaleSig;
    switchToEnglish: switchToEnglishSig;
    switchToArabic: switchToArabicSig;
    asyncActionError: asyncActionErrorSig;
    asyncActionFinish: asyncActionFinishSig;
    asyncActionStart: asyncActionStartSig;
}
