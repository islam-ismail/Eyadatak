import { SET_LOCALE } from "./globalStateConstants";
import { AppAction } from "../../types/app-action";

export interface setLocaleAction extends AppAction {
    type: typeof SET_LOCALE;
    payload: string;
    excludeRefresh: boolean;
}
