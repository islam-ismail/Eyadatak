import { ApiResponse } from "../../api-response";
import { User } from "../../models/User";

export const Api_AuthMe_Endpoint = () => `auth/me`;

export const Api_AuthMe_HttpMethod = "GET";

export interface Api_AuthMe_Response extends ApiResponse {
    data?: {
        user: User;
    };
}
