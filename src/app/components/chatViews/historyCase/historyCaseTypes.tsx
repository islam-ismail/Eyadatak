import { GET_HISTORY_CASE_REPLIES } from "./historyCaseConstants";
import { AppAction } from "../../../types/app-action";
import { CaseChatElement } from "../chatCaseTypes";

export interface GetHistoryCaseChatDataAction extends AppAction {
    type: typeof GET_HISTORY_CASE_REPLIES;
    payload: CaseChatElement[];
}
