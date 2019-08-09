import { SIGN_IN, SIGN_OUT } from "./authConstants";
import { createReducer } from "../../reducers/reducerUtil";
import { User } from "../../types/models/User";

export interface AuthState {
    authenticated: boolean;
    signedInUser: User | null;
}

const initialState: AuthState = {
    authenticated: false,
    signedInUser: null
};

export const signIn = (state: AuthState, payload: User) => {
    return {
        ...state,
        authenticated: true,
        signedInUser: payload
    };
};

export const signOut = (state: AuthState) => {
    return {
        ...state,
        authenticated: false,
        signedInUser: null
    };
};

export default createReducer(initialState, {
    [SIGN_IN]: signIn,
    [SIGN_OUT]: signOut
});
