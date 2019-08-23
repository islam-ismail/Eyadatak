import { ApiResponse } from "../../../api-response";
import { PatientHistoryAccess } from "../../../models/PatientHistoryAccess";

export const Api_PatientPatientHistoryAccessViewMedicalCase_Endpoint = (payload: {
    medical_case_id: number;
}) => `patient/patient_history_access/medical_case/${payload.medical_case_id}`;

export const Api_PatientPatientHistoryAccessViewMedicalCase_HttpMethod = "GET";

export interface Api_PatientPatientHistoryAccessViewMedicalCase_Response extends ApiResponse {
    data?: {
        history_accesses: PatientHistoryAccess[];
    };
}
