import { ApiResponse } from "../../api-response";
import { Doctor } from "../../models/Doctor";

export const Api_DoctorsView_Endpoint = (doctor_id: number) => `doctors/${doctor_id}`;

export const Api_DoctorsView_HttpMethod = "GET";

export interface Api_DoctorsView_Response extends ApiResponse {
    data?: {
        doctor: Doctor;
    };
}
