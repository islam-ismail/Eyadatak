import { ApiResponse } from "../../../api-response";
import { PatientHistoryAccess } from "../../../models/PatientHistoryAccess";

export const Api_PatientPatientHistoryAccessDecline_Endpoint = (payload: {
    patient_history_access_id: number;
}) => `patient/patient_history_access/decline/${payload.patient_history_access_id}`;

export const Api_PatientPatientHistoryAccessDecline_HttpMethod = "POST";

export interface Api_PatientPatientHistoryAccessDecline_Response extends ApiResponse {
    data?: {
        history_access: PatientHistoryAccess;
    };
}
