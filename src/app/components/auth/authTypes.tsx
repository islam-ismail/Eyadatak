import { AppAction } from "../../types/app-action";
import { SIGN_IN, SIGN_OUT, SIGN_UP, UPDATE_USER } from "./authConstants";
import { User } from "../../types/models/User";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";

export interface SignInAction extends AppAction {
    type: typeof SIGN_IN;
    payload: User;
}

export interface SignUpAction extends AppAction {
    type: typeof SIGN_UP;
}

export interface SignOutAction extends AppAction {
    type: typeof SIGN_OUT;
}

export interface UpdateUserAction extends AppAction {
    type: typeof UPDATE_USER;
    payload: User;
}

export type AuthActions = SignInAction & SignUpAction & SignOutAction & UpdateUserAction;

export interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    birthdate: string;
    gender: string;
    phone_number: string;
    picture?: File;
}

export interface UpdateUserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    birthdate: string;
    gender: string;
    phone_number: string;
    picture?: File;
}

export interface SignInFormData {
    email: string;
    password: string;
}

export type signInSig = (data: { user: User }) => SignInAction;

export type updateUserSig = (data: { user: User }) => UpdateUserAction;

export type signOutSig = () => SignOutAction;

export type clearListsActionSig = () => (
    dispatch: ThunkDispatch<{}, {}, AppAction>
) => Promise<void>;

export type refreshTokenSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type autoSignInSig = () => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type asyncSignInSig = (
    formData: SignInFormData
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncSignUpSig = (
    formData: SignUpFormData
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type asyncUpdateUserSig = (
    formData: UpdateUserFormData
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface AuthActionsSignatures {
    clearListsAction: clearListsActionSig;
    refreshToken: refreshTokenSig;
    autoSignIn: autoSignInSig;
    asyncSignIn: asyncSignInSig;
    asyncSignUp: asyncSignUpSig;
    asyncUpdateUser: asyncUpdateUserSig;
    signIn: signInSig;
    signOut: signOutSig;
    updateUser: updateUserSig;
}
