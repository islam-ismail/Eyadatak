import { AppAction } from "../../types/app-action";
import { GET_ALL_USERS } from "./usersConstants";
import { User } from "../../types/models/User";

export interface GetAllUsersAction extends AppAction {
    type: typeof GET_ALL_USERS;
    payload: User[];
}

export type UsersActions = GetAllUsersAction;
