import { GET_ALL_USERS } from "./usersConstants";
import { createReducer } from "../../reducers/reducerUtil";
import { User } from "../../types/models/User";

export interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: []
};

export const getAllUsers = (state: UsersState, payload: User[]) => {
    return {
        ...state,
        users: payload
    };
};

export default createReducer(initialState, {
    [GET_ALL_USERS]: getAllUsers
});
