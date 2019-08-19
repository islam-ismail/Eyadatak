import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../../types/app-action";
import { Doctor } from "../../types/models/Doctor";
import { MedicalCase } from "../../types/models/MedicalCase";
import { getChatCaseReplies } from "../chatViews/chatCaseActions";
import { getPrimarySpecialities, getSecondarySpecialities } from "../newCase/newCaseActions";
import * as transferCaseConstants from "./transferCaseConstants";
import * as transferCaseTypes from "./transferCaseTypes";

export const transferCaseActionStart = (): transferCaseTypes.TransferCaseActionStartAction => {
    return {
        type: transferCaseConstants.TRANSFER_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const transferCaseActionFinish = (): transferCaseTypes.TransferCaseActionFinishAction => {
    return {
        type: transferCaseConstants.TRANSFER_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const transferCaseActionError = (): transferCaseTypes.TransferCaseActionErrorAction => {
    return {
        type: transferCaseConstants.TRANSFER_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getDoctorsList = (
    doctorsList: transferCaseTypes.DoctorsWithSpecialities[]
): transferCaseTypes.GetDoctorsListAction => {
    return {
        type: transferCaseConstants.GET_SPECIALITY_DOCTORS,
        payload: doctorsList
    };
};

export const transferRequestSuccessful = (): transferCaseTypes.TransferRequestSuccessfulAction => {
    return {
        type: transferCaseConstants.TRANSFER_REQUEST_SUCCESSFUL,
        excludeRefresh: true
    };
};

export const getTopLevelSpecialities: transferCaseTypes.getTopLevelSpecialitiesSig = () => {
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

export const getSecondLevelSpecialities: transferCaseTypes.getSecondLevelSpecialitiesSig = (
    parentId: number
) => {
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

export const getSpecialityDoctorsList: transferCaseTypes.getSpecialityDoctorsListSig = (
    selectedSpecialityID: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            const response = await axios.get(`doctors`);
            const data = response.data;
            const doctors: Doctor[] = data.data.doctors;

            let doctorsWithSpecialities: transferCaseTypes.DoctorsWithSpecialities[] = [];
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

export const transferCaseToDoctor: transferCaseTypes.transferCaseToDoctorSig = (
    transferCase: MedicalCase,
    toDoctorId: number,
    toSpecialityId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
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

export const transferCaseToSpeciality: transferCaseTypes.transferCaseToSpecialitySig = (
    transferCase: MedicalCase,
    toSpecialityId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
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

export const deleteTransfer: transferCaseTypes.deleteTransferSig = (
    transferCase: MedicalCase,
    transferId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
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
