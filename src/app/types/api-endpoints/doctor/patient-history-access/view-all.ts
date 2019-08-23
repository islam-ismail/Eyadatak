import { ApiResponse } from "../../../api-response";
import { PatientHistoryAccess } from "../../../models/PatientHistoryAccess";

export const Api_DoctorPatientHistoryAccessViewAll_Endpoint = () => `doctor/patient_history_access`;

export const Api_DoctorPatientHistoryAccessViewAll_HttpMethod = "GET";

export interface Api_DoctorPatientHistoryAccessViewAll_QueryParameters {
    status: string;
}

export interface Api_DoctorPatientHistoryAccessViewAll_Response extends ApiResponse {
    data?: {
        history_accesses: PatientHistoryAccess[];
    };
}
