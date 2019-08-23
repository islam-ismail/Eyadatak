import { ApiResponse } from "../../api-response";
import { MedicalCase } from "../../models/MedicalCase";

export const Api_MedicalCasesView_Endpoint = (payload: { medical_case_id?: number }) =>
    `medical_cases/${payload.medical_case_id}`;

export const Api_MedicalCasesView_HttpMethod = "GET";

export interface Api_MedicalCasesView_Response extends ApiResponse {
    data?: {
        medical_case: MedicalCase;
    };
}
