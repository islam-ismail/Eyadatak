import { ApiResponse } from "../../../api-response";
import { MedicalCase } from "../../../models/MedicalCase";

export const Api_PatientMedicalCasesAdd_Endpoint = (patient_id?: number) =>
    `patient/medical_cases/${patient_id && patient_id}`;

export const Api_PatientMedicalCasesAdd_HttpMethod = "POST";

export interface Api_PatientMedicalCasesAdd_Payload {
    speciality_id: number;
    description: string;
    answers?: any;
}

export interface Api_PatientMedicalCasesAdd_Response extends ApiResponse {
    data?: {
        medical_case: MedicalCase;
    };
}
