import { AppAction } from "../../types/app-action";
import { SIGN_IN } from "./authConstants";
import { User } from "../../types/models/User";

export interface SignInAction extends AppAction {
    type: typeof SIGN_IN;
    payload: User;
}
