import axios from "axios";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { SIGN_IN, SIGN_OUT } from "./authConstants";
import { setAuthorizationHeader } from "../../util/helpersFunc";
import { isTokenExpired, getJWT } from "../../util/helpersFunc";
import { clearCaseLists } from "../myCasesList/myCasesListActions";
import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from "../globalState/globalStateActions";
import { AppAction } from "../../types/app-action";
import { User } from "../../types/models/User";
import { SignInAction } from "./authTypes";
import { Dispatch } from "redux";

export const asyncSignUp = user => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(asyncActionStart());
            const response = await axios.post("auth/register", user);
            const data = response.data;
            toast.success(data.success_message);
            dispatch(asyncActionFinish());
            dispatch(reset("signupForm"));
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(asyncActionError());
        }
    };
};

export const signIn = (data: { user: User }): SignInAction => {
    return {
        type: SIGN_IN,
        payload: data.user
        // excludeRefresh: true
    };
};

export const asyncSignIn = user => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(asyncActionStart());
            const response = await axios.post("auth/login", user);
            const data = response.data;
            dispatch(signIn(data.data));
            const token = data.data.access_token;
            localStorage.setItem("eyadatak-jwt", token);
            setAuthorizationHeader(token);
            dispatch(asyncActionFinish());
            toast.success(`Welcome back, ${data.data.user.name}`);
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(asyncActionError());
        }
    };
};

export const autoSignIn = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        dispatch(asyncActionStart());
        const token = getJWT();
        if (token && !isTokenExpired(token)) {
            try {
                const response = await axios.get("auth/me");
                const data = response.data;
                setAuthorizationHeader(token);
                dispatch(signIn(data.data));
                dispatch(asyncActionFinish());
            } catch (error) {
                dispatch(signOut());
                dispatch(asyncActionError());
            }
        } else if (token && isTokenExpired(token)) {
            dispatch(refreshToken());
        } else {
            dispatch(signOut());
            dispatch(asyncActionFinish());
        }
    };
};

export const refreshToken = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(asyncActionStart());
            const response = await axios.post("auth/refresh");
            const data = response.data;
            const token = data.data.access_token;
            localStorage.setItem("eyadatak-jwt", token);
            setAuthorizationHeader(token);
            dispatch(signIn(data.data));
            dispatch(asyncActionFinish());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(signOut());
            dispatch(asyncActionError());
        }
    };
};

export const clearListsAction = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(clearCaseLists());
        } catch (error) {
            toast.error(error.response.data.error_message);
            dispatch(signOut());
            dispatch(asyncActionError());
        }
    };
};

export const signOut = (): AppAction => {
    localStorage.removeItem("eyadatak-jwt");
    setAuthorizationHeader(null);
    return {
        type: SIGN_OUT,
        excludeRefresh: true
    };
};
