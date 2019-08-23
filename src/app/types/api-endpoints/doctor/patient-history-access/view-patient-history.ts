import { ApiResponse } from "../../../api-response";
import { MedicalCase } from "../../../models/MedicalCase";

export const DoctorPatientHistoryAccessViewPatientHistory_Endpoint = (patient_id: number) =>
    `doctor/patient_history_access/patient/${patient_id}`;

export const DoctorPatientHistoryAccessViewPatientHistory_HttpMethod = "GET";

export interface DoctorPatientHistoryAccessViewPatientHistory_Response extends ApiResponse {
    data?: {
        medical_cases: MedicalCase[];
    };
}
