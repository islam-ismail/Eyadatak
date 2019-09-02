import axios from "axios";
import { toast } from "react-toastify";
import { reset } from "redux-form";
import { SIGN_IN, SIGN_OUT, UPDATE_USER } from "./authConstants";
import {
    setAuthorizationHeader,
    setSignedInUser,
    removeSignedInUser
} from "../../util/helpersFunc";
import { isTokenExpired, getJWT } from "../../util/helpersFunc";
import { clearCaseLists } from "../myCasesList/myCasesListActions";
import * as globalStateActions from "../globalState/globalStateActions";
import { AppAction } from "../../types/app-action";
import { User } from "../../types/models/User";
import * as authTypes from "./authTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
    Api_AuthRegister_Endpoint,
    Api_AuthRegister_Payload,
    Api_AuthRegister_Response,
    Api_AuthLogin_Endpoint,
    Api_AuthLogin_Payload,
    Api_AuthLogin_Response,
    Api_AuthMe_Endpoint,
    Api_AuthMe_Response,
    Api_AuthRefresh_Endpoint,
    Api_AuthRefresh_Response
} from "../../types/api-endpoints/auth";
import {
    Api_PatientUpdate_Payload,
    Api_PatientUpdate_Endpoint,
    Api_PatientUpdate_Response
} from "../../types/api-endpoints/patient";

export const signIn: authTypes.signInSig = (data: { user: User }): authTypes.SignInAction => {
    setSignedInUser(JSON.stringify(data.user));

    return {
        type: SIGN_IN,
        payload: data.user
    };
};

export const updateUser: authTypes.updateUserSig = (data: {
    user: User;
}): authTypes.UpdateUserAction => {
    setSignedInUser(JSON.stringify(data.user));

    return {
        type: UPDATE_USER,
        payload: data.user
    };
};

export const signOut: authTypes.signOutSig = (): authTypes.SignOutAction => {
    localStorage.removeItem("eyadatak-jwt");
    removeSignedInUser();
    setAuthorizationHeader(null);

    return {
        type: SIGN_OUT,
        excludeRefresh: true
    };
};

export const asyncSignUp: authTypes.asyncSignUpSig = (formData: Api_AuthRegister_Payload) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(globalStateActions.asyncActionStart());
            const response = await axios.post(Api_AuthRegister_Endpoint(), formData);
            const responseData: Api_AuthRegister_Response = response.data;
            toast.success(responseData.success_message);
            dispatch(globalStateActions.asyncActionFinish());
            dispatch(reset("signupForm"));
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.error_message);
            }
            dispatch(globalStateActions.asyncActionError());
        }
    };
};

export const asyncSignIn: authTypes.asyncSignInSig = (formData: Api_AuthLogin_Payload) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(globalStateActions.asyncActionStart());
            const response = await axios.post(Api_AuthLogin_Endpoint(), formData);
            const responseData: Api_AuthLogin_Response = response.data;
            if (responseData && responseData.status) {
                if (responseData.data) {
                    dispatch(signIn(responseData.data));
                    const token = responseData.data.access_token;
                    localStorage.setItem("eyadatak-jwt", token);

                    setAuthorizationHeader(token);
                    dispatch(globalStateActions.asyncActionFinish());
                    toast.success(`Welcome back, ${responseData.data.user.name}`);
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.error_message);
            }
            dispatch(globalStateActions.asyncActionError());
        }
    };
};

export const asyncUpdateUser: authTypes.asyncUpdateUserSig = (
    formData: Api_PatientUpdate_Payload
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            // dispatch(globalStateActions.asyncActionStart());
            const response = await axios.post(Api_PatientUpdate_Endpoint(), formData);
            const responseData: Api_PatientUpdate_Response = response.data;
            if (responseData && responseData.status) {
                if (responseData.data) {
                    dispatch(updateUser(responseData.data));
                    // dispatch(globalStateActions.asyncActionFinish());
                    toast.success(`Your information updated successfully!`);
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.error_message);
            }
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
                const response = await axios.get(Api_AuthMe_Endpoint());
                const responseData: Api_AuthMe_Response = response.data;
                if (responseData.data) {
                    setAuthorizationHeader(token);
                    dispatch(signIn(responseData.data));
                    dispatch(globalStateActions.asyncActionFinish());
                }
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
            const response = await axios.post(Api_AuthRefresh_Endpoint());
            const responseData: Api_AuthRefresh_Response = response.data;
            if (responseData.data) {
                const token = responseData.data.access_token;
                localStorage.setItem("eyadatak-jwt", token);
                setAuthorizationHeader(token);
                dispatch(signIn(responseData.data));
                dispatch(globalStateActions.asyncActionFinish());
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.error_message);
            }
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
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.error_message);
            }
            dispatch(signOut());
            dispatch(globalStateActions.asyncActionError());
        }
    };
};
