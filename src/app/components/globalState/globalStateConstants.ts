export const ASYNC_ACTION_START = "ASYNC_ACTION_START";
export const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
export const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";
export const SWITCH_TO_ARABIC = "SWITCH_TO_ARABIC";
export const SWITCH_TO_ENGLISH = "SWITCH_TO_ENGLISH";
export const SET_LOCALE = "SET_LOCALE";

export type GlobalStateActionTypes = typeof ASYNC_ACTION_START &
    typeof ASYNC_ACTION_FINISH &
    typeof ASYNC_ACTION_ERROR &
    typeof SWITCH_TO_ARABIC &
    typeof SWITCH_TO_ENGLISH &
    typeof SET_LOCALE;
