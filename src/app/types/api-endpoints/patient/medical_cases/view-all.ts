import { ApiResponse } from "../../../api-response";
import { MedicalCase } from "../../../models/MedicalCase";

export const Api_PatientMedicalCasesViewAll_Endpoint = (patient_id?: number) =>
    `patient/medical_cases${patient_id ? "/" + patient_id : ""}`;

export const Api_PatientMedicalCasesViewAll_HttpMethod = "GET";

export interface Api_PatientMedicalCasesViewAll_Response extends ApiResponse {
    data?: {
        medical_cases: MedicalCase[];
    };
}
