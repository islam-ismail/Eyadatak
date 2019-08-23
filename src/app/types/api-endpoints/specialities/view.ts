import { ApiResponse } from "../../api-response";
import { Speciality } from "../../models/Speciality";

export const Api_SpecialitiesView_Endpoint = (speciality_id: number) =>
    `specialities/view/${speciality_id}`;

export const Api_SpecialitiesView_HttpMethod = "GET";

export interface Api_SpecialitiesView_Response extends ApiResponse {
    data?: {
        speciality: Speciality;
    };
}
