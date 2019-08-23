import { ApiResponse } from "../../../api-response";
import { CaseTransfer } from "../../../models/CaseTransfer";

export const Api_DoctorCaseTransfersViewAll_Endpoint = () => `doctor/case_transfers`;

export const Api_DoctorCaseTransfersViewAll_HttpMethod = "GET";

export interface Api_DoctorCaseTransfersViewAll_Response extends ApiResponse {
    data?: {
        case_transfers: CaseTransfer[];
    };
}
