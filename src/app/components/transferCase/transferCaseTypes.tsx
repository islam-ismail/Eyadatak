import { GET_SPECIALITY_DOCTORS } from "./transferCaseConstants";
import { Doctor } from "../../types/models/Doctor";
import { AppAction } from "../../types/app-action";

export interface DoctorsWithSpecialities {
    key: number;
    value: string;
    specialityId: number;
}

export interface GetDoctorsListAction extends AppAction {
    type: typeof GET_SPECIALITY_DOCTORS;
    payload: DoctorsWithSpecialities[];
}
