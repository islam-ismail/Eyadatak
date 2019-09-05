export interface User {
    id: number;
    name: string;
    email: string;
    birthdate: string;
    gender: string;
    phone_number: string;
    picture_url: string;
    parent_id: number;
    type: "doctor" | "patient";
    patient_wallet: {
        balance: number;
    };
    created_at: string;
    updated_at: string;
}
