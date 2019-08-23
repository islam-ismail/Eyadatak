import { ApiResponse } from "../../api-response";
import { User } from "../../models/User";

export const Api_AuthRefresh_Endpoint = () => `auth/refresh`;

export const Api_AuthRefresh_HttpMethod = "POST";

export interface Api_AuthRefresh_Response extends ApiResponse {
    data?: {
        user: User;
        access_token: string;
        expires_in: number;
    };
}
