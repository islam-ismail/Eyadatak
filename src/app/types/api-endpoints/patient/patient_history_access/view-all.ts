import { ApiResponse } from "../../../api-response";
import { PatientHistoryAccess } from "../../../models/PatientHistoryAccess";

export const Api_PatientPatientHistoryAccessViewAll_Endpoint = (payload: { patient_id?: number }) =>
    `patient/patient_history_access/${payload.patient_id && payload.patient_id}`;

export const Api_PatientPatientHistoryAccessViewAll_HttpMethod = "GET";

export interface Api_PatientPatientHistoryAccessViewAll_QueryParameters {
    status: string;
}

export interface Api_PatientPatientHistoryAccessViewAll_Response extends ApiResponse {
    data?: {
        history_accesses: PatientHistoryAccess[];
    };
}
