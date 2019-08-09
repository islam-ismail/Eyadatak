export interface CaseFollowup {
    id: number;
    case_id: number;
    doctor_id: number;
    patient_id: number;
    description: string;
    followup_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}
