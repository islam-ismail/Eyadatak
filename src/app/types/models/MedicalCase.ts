import { Speciality } from "./Speciality";
import { Doctor } from "./Doctor";
import { User } from "./User";

export interface MedicalCase {
    id: number;
    speciality_id: number;
    doctor_id: number;
    patient_id: number;
    title: string;
    description: string;
    status: string;
    paid: number;
    created_at: string;
    updated_at: string;
    speciality: Speciality;
    doctor?: Doctor;
    patient?: User;
}
