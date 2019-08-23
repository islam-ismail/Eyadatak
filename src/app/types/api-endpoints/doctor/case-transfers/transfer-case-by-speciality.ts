import { ApiResponse } from "../../../api-response";
import { CaseTransfer } from "../../../models/CaseTransfer";

export const Api_DoctorCaseTransfersTransferCaseBySpeciality_Endpoint = (medical_case_id: number) =>
    `doctor/case_transfers/transfer_case_by_speciality/${medical_case_id}`;

export const Api_DoctorCaseTransfersTransferCaseBySpeciality_HttpMethod = "POST";

export interface Api_DoctorCaseTransfersTransferCaseBySpeciality_Payload {
    speciality_id: number;
}

export interface Api_DoctorCaseTransfersTransferCaseBySpeciality_Response extends ApiResponse {
    data?: {
        case_transfer: CaseTransfer;
    };
}
