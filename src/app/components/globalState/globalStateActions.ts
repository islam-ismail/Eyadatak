import * as globalStateConstants from "./globalStateConstants";
import * as globalStateTypes from "./globalStateTypes";

export const asyncActionStart: globalStateTypes.asyncActionStartSig = (): globalStateTypes.asynActionStartedAction => {
    return {
        type: globalStateConstants.ASYNC_ACTION_START,
        excludeRefresh: true
    };
};

export const asyncActionFinish: globalStateTypes.asyncActionFinishSig = (): globalStateTypes.asynActionFinishedAction => {
    return {
        type: globalStateConstants.ASYNC_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const asyncActionError: globalStateTypes.asyncActionErrorSig = (): globalStateTypes.asynActionErrorAction => {
    return {
        type: globalStateConstants.ASYNC_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const switchToArabic: globalStateTypes.switchToArabicSig = (): globalStateTypes.switchToArabicAction => {
    return {
        type: globalStateConstants.SWITCH_TO_ARABIC,
        excludeRefresh: true
    };
};

export const switchToEnglish: globalStateTypes.switchToEnglishSig = (): globalStateTypes.switchToEnglishAction => {
    return {
        type: globalStateConstants.SWITCH_TO_ENGLISH,
        excludeRefresh: true
    };
};

export const setLocale: globalStateTypes.setLocaleSig = (
    locale: string
): globalStateTypes.setLocaleAction => {
    return {
        type: globalStateConstants.SET_LOCALE,
        payload: locale,
        excludeRefresh: true
    };
};
