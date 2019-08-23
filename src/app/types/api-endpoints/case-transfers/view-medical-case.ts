import { ApiResponse } from "../../api-response";
import { CaseTransfer } from "../../models/CaseTransfer";

export const Api_CaseTransfersViewMedicalCase_Endpoint = (medical_case_id: number) =>
    `case_transfers/${medical_case_id}`;

export const Api_CaseTransfersViewMedicalCase_HttpMethod = "GET";

export interface Api_CaseTransfersViewMedicalCase_Response extends ApiResponse {
    data?: {
        case_transfers: CaseTransfer[];
    };
}
