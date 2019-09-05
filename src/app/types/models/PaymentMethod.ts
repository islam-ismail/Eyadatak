export interface PaymentMethod {
    id: number;
    patient_id: number;
    type: "Accept" | "Fawry";
    credentials: any;
    created_at: string;
    updated_at: string;
}
