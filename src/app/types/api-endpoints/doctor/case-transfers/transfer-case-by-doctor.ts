import { ApiResponse } from "../../../api-response";
import { CaseTransfer } from "../../../models/CaseTransfer";

export const Api_DoctorCaseTransfersTransferCaseByDoctor_Endpoint = (medical_case_id: number) =>
    `doctor/case_transfers/transfer_case_by_doctor/${medical_case_id}`;

export const Api_DoctorCaseTransfersTransferCaseByDoctor_HttpMethod = "POST";

export interface Api_DoctorCaseTransfersTransferCaseByDoctor_Payload {
    speciality_id: number;
    doctor_id: number;
}

export interface Api_DoctorCaseTransfersTransferCaseByDoctor_Response extends ApiResponse {
    data?: {
        case_transfer: CaseTransfer;
    };
}
