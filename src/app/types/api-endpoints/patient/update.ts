import { ApiResponse } from "../../api-response";
import { User } from "../../models/User";

export const Api_PatientUpdate_Endpoint = (patient_id?: number) =>
    `patient/update${patient_id ? "/" + patient_id : ""}`;

export const Api_PatientUpdate_HttpMethod = "POST";

export interface Api_PatientUpdate_Payload {
    name: string;
    email: string;
    phone_number: string;
    password?: string;
    password_confirmation?: string;
    birthdate?: string;
    gender?: string;
    picture?: File;
}

export interface Api_PatientUpdate_Response extends ApiResponse {
    data?: {
        user: User;
    };
}
