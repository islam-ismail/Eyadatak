import { User } from "./User";
import { DoctorInfo } from "./DoctorInfo";
import { EducationDegree } from "./EducationDegree";
import { Speciality } from "./Speciality";

export interface Doctor extends User {
    doctor_info: DoctorInfo;
    education_degrees: EducationDegree[];
    specialities: Speciality[];
}
