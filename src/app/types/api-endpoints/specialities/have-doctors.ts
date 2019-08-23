import { ApiResponse } from "../../api-response";
import { Speciality } from "../../models/Speciality";

export const Api_SpecialitiesHaveDoctors_Endpoint = () => `specialities/have_doctors`;

export const Api_SpecialitiesHaveDoctors_HttpMethod = "GET";

export interface Api_SpecialitiesHaveDoctors_Response extends ApiResponse {
    data?: {
        specialities: Speciality[];
    };
}
