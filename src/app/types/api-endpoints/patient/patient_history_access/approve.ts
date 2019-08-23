import { ApiResponse } from "../../../api-response";
import { PatientHistoryAccess } from "../../../models/PatientHistoryAccess";

export const Api_PatientPatientHistoryAccessApprove_Endpoint = (payload: {
    patient_history_access_id: number;
}) => `patient/patient_history_access/approve/${payload.patient_history_access_id}`;

export const Api_PatientPatientHistoryAccessApprove_HttpMethod = "POST";

export interface Api_PatientPatientHistoryAccessApprove_Payload {
    access_level: "All" | "Speciality";
}

export interface Api_PatientPatientHistoryAccessApprove_Response extends ApiResponse {
    data?: {
        history_access: PatientHistoryAccess;
    };
}
