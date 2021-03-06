export const HISTORY_ACCESS_ACTION_START = "HISTORY_ACCESS_ACTION_START";
export const HISTORY_ACCESS_ACTION_FINISH = "HISTORY_ACCESS_ACTION_FINISH";
export const HISTORY_ACCESS_ACTION_ERROR = "HISTORY_ACCESS_ACTION_ERROR";
export const REQUEST_FULL_ACCESS = "REQUEST_FULL_ACCESS";
export const REQUEST_SPECIALITY_ACCESS = "REQUEST_SPECIALITY_ACCESS";
export const SET_REQUEST_STATUS_AND_ACCESS_LEVEL = "SET_REQUEST_STATUS_AND_ACCESS_LEVEL";
export const SET_HISTORY_CASES = "SET_HISTORY_CASES";

export type HistoryAccessActionTypes = typeof HISTORY_ACCESS_ACTION_START &
    typeof HISTORY_ACCESS_ACTION_FINISH &
    typeof HISTORY_ACCESS_ACTION_ERROR &
    typeof REQUEST_FULL_ACCESS &
    typeof REQUEST_SPECIALITY_ACCESS &
    typeof SET_REQUEST_STATUS_AND_ACCESS_LEVEL &
    typeof SET_HISTORY_CASES;
