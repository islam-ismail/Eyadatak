import { ApiResponse } from "../../api-response";
import { User } from "../../models/User";

export const Api_PatientUpdate_Endpoint = (payload: { patient_id?: number }) =>
    `patient/update/${payload.patient_id && payload.patient_id}`;

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
