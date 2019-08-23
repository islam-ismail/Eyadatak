import { ApiResponse } from "../../api-response";

export const Api_AuthRegister_Endpoint = () => `auth/register`;

export const Api_AuthRegister_HttpMethod = "POST";

export interface Api_AuthRegister_Payload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    birthdate: string;
    gender: string;
    phone_number: string;
    picture?: File;
}

export interface Api_AuthRegister_Response extends ApiResponse {}
