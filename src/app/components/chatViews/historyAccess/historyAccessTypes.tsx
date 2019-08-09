import { GET_HISTORY_CASES, GET_REQUEST_STATUS_AND_ACCESS_LEVEL } from "./historyAccessConstants";
import { AppAction } from "../../../types/app-action";
import { PatientHistoryAccess } from "../../../types/models/PatientHistoryAccess";
import { MedicalCase } from "../../../types/models/MedicalCase";

export interface GetRequestStatusAction extends AppAction {
    type: typeof GET_REQUEST_STATUS_AND_ACCESS_LEVEL;
    payload: {
        requestStatus: string;
        accessLevel: string;
        historyAccessId: number;
        waitingApproval: boolean;
        waitingLevel: string;
        allAccessRequests: PatientHistoryAccess[];
    };
}

export interface GetApprovedHistoryCasesAction extends AppAction {
    type: typeof GET_HISTORY_CASES;
    payload: MedicalCase[];
}
