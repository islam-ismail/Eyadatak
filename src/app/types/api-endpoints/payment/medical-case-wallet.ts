import { ApiResponse } from "../../api-response";
import { MedicalCase } from "../../models/MedicalCase";

export const Api_PaymentMedicalCaseWallet_Endpoint = (medical_case_id: number) =>
    `patient/payment/medical_case/${medical_case_id}/wallet`;

export const Api_PaymentMedicalCaseWallet_HttpMethod = "POST";

export interface Api_PaymentMedicalCaseWallet_Response extends ApiResponse {
    data?: {
        medical_case: MedicalCase;
    };
}
