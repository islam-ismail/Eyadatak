import { ApiResponse } from "../../../api-response";
import { MedicalCase } from "../../../models/MedicalCase";

export const Api_DoctorMedicalCasesClose_Endpoint = (medical_case_id: number) =>
    `doctor/medical_cases/close/${medical_case_id}`;

export const Api_DoctorMedicalCasesClose_HttpMethod = "POST";

export interface Api_DoctorMedicalCasesClose_Response extends ApiResponse {
    data?: {
        medical_case: MedicalCase;
    };
}
