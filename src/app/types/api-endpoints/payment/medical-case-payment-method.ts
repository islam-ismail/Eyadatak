import { ApiResponse } from "../../api-response";
import { MedicalCase } from "../../models/MedicalCase";

export const Api_PaymentMedicalCasePaymentMethod_Endpoint = (payload: {
    medical_case_id: number;
}) => `patient/payment/medical_case/${payload.medical_case_id}/payment_method`;

export const Api_PaymentMedicalCasePaymentMethod_HttpMethod = "POST";

export interface Api_PaymentMedicalCasePaymentMethod_Payload {
    payment_method_id?: number;
    payment_method_type?: string;
}

export interface Api_PaymentMedicalCasePaymentMethod_Response extends ApiResponse {
    data?: {
        completed: number;
        medical_case?: MedicalCase;
    };
}
