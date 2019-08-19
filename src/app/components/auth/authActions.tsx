import axios from "axios";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { SIGN_IN, SIGN_OUT } from "./authConstants";
import { setAuthorizationHeader } from "../../util/helpersFunc";
import { isTokenExpired, getJWT } from "../../util/helpersFunc";
import { clearCaseLists } from "../myCasesList/myCasesListActions";
import * as globalStateActions from "../globalState/globalStateActions";
import { AppAction } from "../../types/app-action";
import { User } from "../../types/models/User";
import * as authTypes from "./authTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const signIn: authTypes.signInSig = (data: { user: User }): authTypes.SignInAction => {
    return {
        type: SIGN_IN,
        payload: data.user
    };
};

export const signOut: authTypes.signOutSig = (): authTypes.SignOutAction => {
    localStorage.removeItem("eyadatak-jwt");
    setAuthorizationHeader(null);

    return {
        type: SIGN_OUT,
        excludeRefresh: true
    };
};

export const asyncSignUp: authTypes.asyncSignUpSig = (formData: authTypes.SignUpFormData) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(globalStateActions.asyncActionStart());
            const response = await axios.post("auth/register", formData);
            const data = response.data;
            toast.success(data.success_message);
            dispatch(globalStateActions.asyncActionFinish());
            dispatch(reset("signupForm"));
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(globalStateActions.asyncActionError());
        }
    };
};

export const asyncSignIn: authTypes.asyncSignInSig = (formData: authTypes.SignInFormData) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(globalStateActions.asyncActionStart());
            const response = await axios.post("auth/login", formData);
            if (response.data && response.data.status) {
                const data: {
                    user: User;
                    access_token: string;
                    expires_in: number;
                } = response.data.data;
                dispatch(signIn(data));
                const token = data.access_token;
                localStorage.setItem("eyadatak-jwt", token);
                setAuthorizationHeader(token);
                dispatch(globalStateActions.asyncActionFinish());
                toast.success(`Welcome back, ${data.user.name}`);
            }
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(globalStateActions.asyncActionError());
        }
    };
};

export const autoSignIn: authTypes.autoSignInSig = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        dispatch(globalStateActions.asyncActionStart());
        const token = getJWT();
        if (token && !isTokenExpired(token)) {
            try {
                const response = await axios.get("auth/me");
                const data = response.data;
                setAuthorizationHeader(token);
                dispatch(signIn(data.data));
                dispatch(globalStateActions.asyncActionFinish());
            } catch (error) {
                dispatch(signOut());
                dispatch(globalStateActions.asyncActionError());
            }
        } else if (token && isTokenExpired(token)) {
            dispatch(refreshToken());
        } else {
            dispatch(signOut());
            dispatch(globalStateActions.asyncActionFinish());
        }
    };
};

export const refreshToken: authTypes.refreshTokenSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(globalStateActions.asyncActionStart());
            const response = await axios.post("auth/refresh");
            const data = response.data;
            const token = data.data.access_token;
            localStorage.setItem("eyadatak-jwt", token);
            setAuthorizationHeader(token);
            dispatch(signIn(data.data));
            dispatch(globalStateActions.asyncActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(signOut());
            dispatch(globalStateActions.asyncActionError());
        }
    };
};

export const clearListsAction: authTypes.clearListsActionSig = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(clearCaseLists());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(signOut());
            dispatch(globalStateActions.asyncActionError());
        }
    };
};
