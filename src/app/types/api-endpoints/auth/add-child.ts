import { ApiResponse } from "../../api-response";
import { User } from "../../models/User";

export const Api_AuthAddChild_Endpoint = () => `auth/add_child`;

export const Api_AuthAddChild_HttpMethod = "POST";

export interface Api_AuthAddChild_Payload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    birthdate: string;
    gender: string;
    phone_number: string;
    picture?: File;
}

export interface Api_AuthAddChild_Response extends ApiResponse {
    data?: {
        user: User;
        access_token: string;
        expires_in: number;
    };
}
