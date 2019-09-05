import { PaymentMethod } from "./PaymentMethod";

export interface PaymentReceipt {
    id: number;
    payment_method_id: number;
    payment_method: PaymentMethod;
    patient_id: number;
    amount: number;
    transaction_id: string;
    target: "Wallet" | "Medical case";
    target_id: number;
    completed: number;
    created_at: string;
    updated_at: string;
}
