import { ApiResponse } from "../../api-response";
import { User } from "../../models/User";

export const Api_AuthLogin_Endpoint = () => `auth/login`;

export const Api_AuthLogin_HttpMethod = "POST";

export interface Api_AuthLogin_Payload {
    email: string;
    password: string;
}

export interface Api_AuthLogin_Response extends ApiResponse {
    data?: {
        user: User;
        access_token: string;
        expires_in: number;
    };
}
