import { ApiResponse } from "../../api-response";
import { Speciality } from "../../models/Speciality";

export const Api_SpecialitiesViewAll_Endpoint = (parent_id = 0) => `specialities/${parent_id}`;

export const Api_SpecialitiesViewAll_HttpMethod = "GET";

export interface Api_SpecialitiesViewAll_Response extends ApiResponse {
    data?: {
        specialities: Speciality[];
    };
}
