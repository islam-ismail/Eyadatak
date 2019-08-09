export interface PatientHistoryAccess {
    id: number;
    case_id: number;
    patient_id: number;
    doctor_id: number;
    status: string;
    access_level: string;
    created_at: string;
    updated_at: string;
}
