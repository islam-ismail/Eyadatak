import { ApiResponse } from "../../../api-response";
import { PatientHistoryAccess } from "../../../models/PatientHistoryAccess";

export const Api_DoctorPatientHistoryAccessRequestAccess_Endpoint = (medical_case_id: number) =>
    `doctor/patient_history_access/${medical_case_id}`;

export const Api_DoctorPatientHistoryAccessRequestAccess_HttpMethod = "POST";

export interface Api_DoctorPatientHistoryAccessRequestAccess_Payload {
    access_level: "All" | "Speciality";
}

export interface Api_DoctorPatientHistoryAccessRequestAccess_Response extends ApiResponse {
    data?: {
        history_access: PatientHistoryAccess;
    };
}
