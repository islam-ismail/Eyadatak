import { ApiResponse } from "../../api-response";
import { PaymentReceipt } from "../../models/PaymentReceipt";

export const Api_PaymentPaymentReceipts_Endpoint = () => `patient/payment/payment_receipts`;

export const Api_PaymentPaymentReceipts_HttpMethod = "GET";

export interface Api_PaymentPaymentReceipts_Response extends ApiResponse {
    data?: {
        payment_receipts: PaymentReceipt[];
    };
}
