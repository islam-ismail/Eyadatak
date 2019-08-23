import { ApiResponse } from "../../api-response";
import { PatientWallet } from "../../models/PatientWallet";

export const Api_PaymentChargeWallet_Endpoint = () => `patient/payment/wallet`;

export const Api_PaymentChargeWallet_HttpMethod = "POST";

export interface Api_PaymentChargeWallet_Payload {
    amount: number;
    payment_method_id?: number;
    payment_method_type?: string;
}

export interface Api_PaymentChargeWallet_Response extends ApiResponse {
    data?: {
        completed: number;
        patient_wallet?: PatientWallet;
    };
}
