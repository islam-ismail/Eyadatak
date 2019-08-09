import axios from "axios";
import { GET_ALL_USERS } from "./usersConstants";
import { AppAction } from "../../types/app-action";
import { User } from "../../types/models/User";
import { Dispatch } from "redux";

export const getAllUsers = (data: User[]): AppAction => {
    return {
        type: GET_ALL_USERS,
        payload: data
    };
};

export const asyncGetAllUsers = () => {
    return async (dispatch: Dispatch<AppAction>, getState: any) => {
        const response = await axios.get("users");
        const data = response.data;
        dispatch(getAllUsers(data));
    };
};
