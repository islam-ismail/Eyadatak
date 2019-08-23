import { ApiResponse } from "../../../api-response";
import { MedicalCase } from "../../../models/MedicalCase";

export const Api_DoctorMedicalCasesViewAll_Endpoint = () => `doctor/medical_cases`;

export const Api_DoctorMedicalCasesViewAll_HttpMethod = "GET";

export interface Api_DoctorMedicalCasesViewAll_Response extends ApiResponse {
    data?: {
        medical_cases: MedicalCase[];
    };
}
