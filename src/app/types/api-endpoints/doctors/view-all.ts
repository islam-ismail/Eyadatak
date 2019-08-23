import { ApiResponse } from "../../api-response";
import { Doctor } from "../../models/Doctor";

export const Api_DoctorsViewAll_Endpoint = () => `doctors`;

export const Api_DoctorsViewAll_HttpMethod = "GET";

export interface Api_DoctorsViewAll_QueryParameters {
    page: number;
    per_page: number;
}

export interface Api_DoctorsViewAll_Response extends ApiResponse {
    data?: {
        doctors: Doctor[];
    };
}
