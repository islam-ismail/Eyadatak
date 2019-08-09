import axios from "axios";
import { toast } from "react-toastify";
import {
    TRANSFER_CASE_ACTION_START,
    TRANSFER_CASE_ACTION_FINISH,
    TRANSFER_CASE_ACTION_ERROR,
    GET_SPECIALITY_DOCTORS,
    TRANSFER_REQUEST_SUCCESSFUL
} from "./transferCaseConstants";
import { getPrimarySpecialities, getSecondarySpecialities } from "../newCase/newCaseActions";
import { getChatCaseReplies } from "../chatViews/chatCaseActions";
import { AppAction } from "../../types/app-action";
import { GetDoctorsListAction, DoctorsWithSpecialities } from "./transferCaseTypes";
import { Doctor } from "../../types/models/Doctor";
import { Dispatch } from "redux";
import { MedicalCase } from "../../types/models/MedicalCase";

export const transferCaseActionStart = (): AppAction => {
    return {
        type: TRANSFER_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const transferCaseActionFinish = (): AppAction => {
    return {
        type: TRANSFER_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const transferCaseActionError = (): AppAction => {
    return {
        type: TRANSFER_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getDoctorsList = (doctorsList: DoctorsWithSpecialities[]): GetDoctorsListAction => {
    return {
        type: GET_SPECIALITY_DOCTORS,
        payload: doctorsList
    };
};

export const getTopLevelSpecialities = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            const response = await axios.get("specialities/0");
            const data = response.data;
            dispatch(getPrimarySpecialities(data.data.specialities));

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};

export const getSecondLevelSpecialities = (parentId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            const response = await axios.get(`specialities/${parentId}`);
            const data = response.data;
            dispatch(getSecondarySpecialities(data.data.specialities));

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};

export const getSpecialityDoctorsList = (selectedSpecialityID: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            const response = await axios.get(`doctors`);
            const data = response.data;
            const doctors: Doctor[] = data.data.doctors;

            let doctorsWithSpecialities: DoctorsWithSpecialities[] = [];
            await doctors.map(doctor =>
                doctor.specialities.map(doctorSpeciality =>
                    doctorsWithSpecialities.push({
                        key: doctor.id,
                        value: doctor.name,
                        specialityId: doctorSpeciality.id
                    })
                )
            );

            const filteredDoctors = doctorsWithSpecialities.filter(
                doctorSpeciality => doctorSpeciality.specialityId === selectedSpecialityID
            );

            dispatch(getDoctorsList(filteredDoctors));

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};

export const transferRequestSuccessful = (): AppAction => {
    return {
        type: TRANSFER_REQUEST_SUCCESSFUL,
        excludeRefresh: true
    };
};

export const transferCaseToDoctor = (
    transferCase: MedicalCase,
    toDoctorId: number,
    toSpecialityId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            await axios.post(`doctor/case_transfers/transfer_case_by_doctor/${transferCase.id}`, {
                speciality_id: toSpecialityId,
                doctor_id: toDoctorId
            });
            dispatch(getChatCaseReplies(transferCase.id, transferCase, "doctor"));
            dispatch(transferRequestSuccessful());

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};

export const transferCaseToSpeciality = (transferCase: MedicalCase, toSpecialityId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            await axios.post(
                `doctor/case_transfers/transfer_case_by_speciality/${transferCase.id}`,
                { speciality_id: toSpecialityId }
            );
            dispatch(getChatCaseReplies(transferCase.id, transferCase, "doctor"));
            dispatch(transferRequestSuccessful());

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};

export const deleteTransfer = (transferCase: MedicalCase, transferId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            await axios.delete(`doctor/case_transfers/${transferId}`);
            // const response = await axios.delete(`doctor/case_transfers/${transferId}`)
            // const data = response.data
            // console.log('response:', response)
            // console.log('data.status:', data.status)
            // console.log('data.success_message:', data.success_message)
            dispatch(getChatCaseReplies(transferCase.id, transferCase, "doctor"));

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};
