import { createReducer } from "../../reducers/reducerUtil";
import { User } from "../../types/models/User";
import { SIGN_IN, SIGN_OUT, AuthActionTypes } from "./authConstants";
import { AuthActions, SignInAction } from "./authTypes";

export interface AuthState {
    authenticated: boolean;
    signedInUser: User | null;
}

const initialState: AuthState = {
    authenticated: false,
    signedInUser: null
};

export const signIn = (state: AuthState, action: SignInAction) => {
    return {
        ...state,
        authenticated: true,
        signedInUser: action.payload
    };
};

export const signOut = (state: AuthState) => {
    return {
        ...state,
        authenticated: false,
        signedInUser: null
    };
};

export default createReducer<AuthState, AuthActionTypes, AuthActions>(initialState, {
    [SIGN_IN]: signIn,
    [SIGN_OUT]: signOut
});
