import {
    GET_HISTORY_CASE_REPLIES,
    HISTORY_CASE_ACTION_START,
    HISTORY_CASE_ACTION_FINISH,
    HISTORY_CASE_ACTION_ERROR
} from "./historyCaseConstants";
import { AppAction } from "../../../types/app-action";
import { CaseChatElement } from "../chatCaseTypes";
import { MedicalCase } from "../../../types/models/MedicalCase";
import { Dispatch } from "redux";

/**
 * actions signature
 */

export interface GetHistoryCaseChatDataAction extends AppAction {
    type: typeof GET_HISTORY_CASE_REPLIES;
    payload: CaseChatElement[];
}

export interface HistoryCaseActionStartAction extends AppAction {
    type: typeof HISTORY_CASE_ACTION_START;
    excludeRefresh: boolean;
}

export interface HistoryCaseActionFinishAction extends AppAction {
    type: typeof HISTORY_CASE_ACTION_FINISH;
    excludeRefresh: boolean;
}

export interface HistoryCaseActionErrorAction extends AppAction {
    type: typeof HISTORY_CASE_ACTION_ERROR;
    excludeRefresh: boolean;
}

export type HistoryCaseActions = GetHistoryCaseChatDataAction &
    HistoryCaseActionStartAction &
    HistoryCaseActionErrorAction &
    HistoryCaseActionFinishAction &
    HistoryCaseActionErrorAction;

/**
 * action creators signature
 */
export type getHistoryCaseRepliesSig = (
    caseId: number,
    chatCase: MedicalCase,
    clearFirst: boolean
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface HistoryCaseSignatures {
    getHistoryCaseReplies: (
        caseId: number,
        chatCase: MedicalCase,
        clearFirst: boolean
    ) => Promise<void>;
}
