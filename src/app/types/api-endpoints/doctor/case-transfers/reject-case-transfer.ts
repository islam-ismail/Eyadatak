import { ApiResponse } from "../../../api-response";
import { CaseTransfer } from "../../../models/CaseTransfer";

export const Api_DoctorCaseTransfersRejectCaseTransfer_Endpoint = (case_transfer_id: number) =>
    `doctor/case_transfers/reject_case_transfer/${case_transfer_id}`;

export const Api_DoctorCaseTransfersRejectCaseTransfer_HttpMethod = "POST";

export interface Api_DoctorCaseTransfersRejectCaseTransfer_Response extends ApiResponse {
    data?: {
        case_transfer: CaseTransfer;
    };
}
