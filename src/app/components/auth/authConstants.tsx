export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_USER = "UPDATE_USER";

export type AuthActionTypes = typeof SIGN_IN &
    typeof SIGN_UP &
    typeof SIGN_OUT &
    typeof UPDATE_USER;
