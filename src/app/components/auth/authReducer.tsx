import { createReducer } from "../../reducers/reducerUtil";
import { User } from "../../types/models/User";
import { SIGN_IN, SIGN_OUT, AuthActionTypes, UPDATE_USER } from "./authConstants";
import { AuthActions, SignInAction, UpdateUserAction } from "./authTypes";
import { getJWT, getSignedInUser } from "../../util/helpersFunc";

export interface AuthState {
    authenticated: boolean;
    signedInUser: User | null;
}

export const initialAuthState: AuthState = {
    authenticated: getJWT() !== null,
    signedInUser:
        getSignedInUser() && getSignedInUser() !== null
            ? (JSON.parse(getSignedInUser() as string) as User)
            : null
};

export const signIn = (state: AuthState, action: SignInAction) => {
    return {
        ...state,
        authenticated: true,
        signedInUser: action.payload
    };
};

export const updateUser = (state: AuthState, action: UpdateUserAction) => {
    return {
        ...state,
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

export default createReducer<AuthState, AuthActionTypes, AuthActions>(initialAuthState, {
    [SIGN_IN]: signIn,
    [SIGN_OUT]: signOut,
    [UPDATE_USER]: updateUser
});
