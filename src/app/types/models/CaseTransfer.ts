import { MedicalCase } from "./MedicalCase";
import { Doctor } from "./Doctor";
import { Speciality } from "./Speciality";

export interface CaseTransfer {
    id: number;
    from_doctor_id: number;
    to_doctor_id: number;
    from_speciality_id: number;
    to_speciality_id: number;
    case_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    from_speciality: Speciality;
    to_speciality: Speciality;
    from_doctor: Doctor;
    to_doctor: Doctor;
    medical_case: MedicalCase;
}
