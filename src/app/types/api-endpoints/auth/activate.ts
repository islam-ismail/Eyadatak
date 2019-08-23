import { ApiResponse } from "../../api-response";
import { User } from "../../models/User";

export const Api_AuthActivate_Endpoint = (params: { user_id: number; token: string }) =>
    `auth/activate/${params.user_id}/${params.token}`;

export const Api_AuthActivate_HttpMethod = "POST";

export interface Api_AuthActivate_Response extends ApiResponse {
    data?: {
        user: User;
        access_token: string;
        expires_in: number;
    };
}
