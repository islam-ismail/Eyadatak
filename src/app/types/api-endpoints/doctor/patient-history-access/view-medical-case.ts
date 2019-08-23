import { ApiResponse } from "../../../api-response";
import { PatientHistoryAccess } from "../../../models/PatientHistoryAccess";

export const Api_DoctorPatientHistoryAccessViewMedicalCase_Endpoint = (medical_case_id: number) =>
    `doctor/patient_history_access/medical_case/${medical_case_id}`;

export const Api_DoctorPatientHistoryAccessViewMedicalCase_HttpMethod = "GET";

export interface Api_DoctorPatientHistoryAccessViewMedicalCase_Response extends ApiResponse {
    data?: {
        history_accesses: PatientHistoryAccess[];
    };
}
