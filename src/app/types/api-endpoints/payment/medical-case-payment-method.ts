import { ApiResponse } from "../../api-response";

export const Api_PaymentMedicalCasePaymentMethod_Endpoint = (medical_case_id: number) =>
    `patient/payment/medical_case/${medical_case_id}/payment_method`;

export const Api_PaymentMedicalCasePaymentMethod_HttpMethod = "POST";

export interface Api_PaymentMedicalCasePaymentMethod_Payload {
    payment_method_id?: number;
    payment_method_type?: "Accept" | "Fawry";
}

export interface Api_PaymentMedicalCasePaymentMethod_Response extends ApiResponse {
    data?: {
        completed: number;
        [key: string]: any;
    };
}
