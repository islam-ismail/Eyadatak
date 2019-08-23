import { ApiResponse } from "../../../api-response";
import { CaseTransfer } from "../../../models/CaseTransfer";

export const Api_DoctorCaseTransfersAcceptCaseTransfer_Endpoint = (case_transfer_id: number) =>
    `doctor/case_transfers/accept_case_transfer/${case_transfer_id}`;

export const Api_DoctorCaseTransfersAcceptCaseTransfer_HttpMethod = "POST";

export interface Api_DoctorCaseTransfersAcceptCaseTransfer_Response extends ApiResponse {
    data?: {
        case_transfer: CaseTransfer;
    };
}
