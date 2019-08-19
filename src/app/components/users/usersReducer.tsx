import { GET_ALL_USERS, UsersActionTypes } from "./usersConstants";
import { createReducer } from "../../reducers/reducerUtil";
import { User } from "../../types/models/User";
import { UsersActions, GetAllUsersAction } from "./usersTypes";

export interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: []
};

export const getAllUsers = (state: UsersState, action: GetAllUsersAction) => {
    return {
        ...state,
        users: action.payload
    };
};

export default createReducer<UsersState, UsersActionTypes, UsersActions>(initialState, {
    [GET_ALL_USERS]: getAllUsers
});
