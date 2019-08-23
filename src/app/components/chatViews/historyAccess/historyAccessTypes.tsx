import * as historyAccessConstants from "./historyAccessConstants";
import { AppAction } from "../../../types/app-action";
import { MedicalCase } from "../../../types/models/MedicalCase";
import { Dispatch } from "redux";
import { User } from "../../../types/models/User";
import { CaseChatElement } from "../chatCaseTypes";

/**
 * actions signature
 */
export interface SetRequestStatusAction extends AppAction {
    type: typeof historyAccessConstants.SET_REQUEST_STATUS_AND_ACCESS_LEVEL;
    payload: {
        requestStatus: string;
        accessLevel: string;
        historyAccessId: number;
        waitingApproval: boolean;
        waitingLevel: string;
        allAccessRequests: CaseChatElement[];
    };
}

export interface SetApprovedHistoryCasesAction extends AppAction {
    type: typeof historyAccessConstants.SET_HISTORY_CASES;
    payload: MedicalCase[];
}

export interface HistoryAccessActionStartAction extends AppAction {
    type: typeof historyAccessConstants.HISTORY_ACCESS_ACTION_START;
    excludeRefresh: boolean;
}

export interface HistoryAccessActionFinishAction extends AppAction {
    type: typeof historyAccessConstants.HISTORY_ACCESS_ACTION_FINISH;
    excludeRefresh: boolean;
}

export interface HistoryAccessActionErrorAction extends AppAction {
    type: typeof historyAccessConstants.HISTORY_ACCESS_ACTION_ERROR;
    excludeRefresh: boolean;
}

export interface RequestFullHistoryAccessAction extends AppAction {
    type: typeof historyAccessConstants.REQUEST_FULL_ACCESS;
}

export interface RequestSpecialityHistoryAccessAction extends AppAction {
    type: typeof historyAccessConstants.REQUEST_SPECIALITY_ACCESS;
}

export type HistoryAccessActions = SetRequestStatusAction &
    SetApprovedHistoryCasesAction &
    HistoryAccessActionStartAction &
    HistoryAccessActionFinishAction &
    HistoryAccessActionErrorAction &
    RequestFullHistoryAccessAction &
    RequestSpecialityHistoryAccessAction;

/**
 * action creators signature
 */
export type requestHistoryAccessSig = (
    accessLevel: string,
    caseId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type setHistoryCasesSig = (
    patientId: number,
    accessLevel: string,
    specialityId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type setAccessRequestStatusSig = (
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number,
    clearFirst: boolean
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type approveHistoryAccessSig = (
    historyAccessId: number,
    accessLevel: string
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type declineHistoryAccessSig = (
    historyAccessId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface HistoryAccessSignatures {
    requestHistoryAccess: (accessLevel: string, caseId: number) => Promise<void>;
    setHistoryCases: (
        patientId: number,
        accessLevel: string,
        specialityId: number
    ) => Promise<void>;
    setAccessRequestStatus: (
        caseId: number,
        user: User,
        patientId: number,
        specialityId: number,
        clearFirst: boolean
    ) => Promise<void>;
    approveHistoryAccess: (historyAccessId: number, accessLevel: string) => Promise<void>;
    declineHistoryAccess: (historyAccessId: number) => Promise<void>;
}
