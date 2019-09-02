import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../../types/app-action";
import { MedicalCase } from "../../types/models/MedicalCase";
import { setChatCaseReplies } from "../chatViews/chatCaseActions";
import { setPrimarySpecialities, setSecondarySpecialities } from "../newCase/newCaseActions";
import * as transferCaseConstants from "./transferCaseConstants";
import * as transferCaseTypes from "./transferCaseTypes";
import {
    Api_SpecialitiesViewAll_Endpoint,
    Api_SpecialitiesViewAll_Response
} from "../../types/api-endpoints/specialities";
import {
    Api_DoctorsViewAll_Endpoint,
    Api_DoctorsViewAll_Response
} from "../../types/api-endpoints/doctors";
import {
    Api_DoctorCaseTransfersTransferCaseByDoctor_Endpoint,
    Api_DoctorCaseTransfersTransferCaseByDoctor_Payload,
    Api_DoctorCaseTransfersRemoveCaseTransfer_Endpoint,
    Api_DoctorCaseTransfersTransferCaseBySpeciality_Endpoint,
    Api_DoctorCaseTransfersTransferCaseBySpeciality_Payload
} from "../../types/api-endpoints/doctor";

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

export const setDoctorsList = (
    doctorsList: transferCaseTypes.DoctorsWithSpecialities[]
): transferCaseTypes.SetDoctorsListAction => {
    return {
        type: transferCaseConstants.SET_SPECIALITY_DOCTORS,
        payload: doctorsList
    };
};

export const transferRequestSuccessful = (): transferCaseTypes.TransferRequestSuccessfulAction => {
    return {
        type: transferCaseConstants.TRANSFER_REQUEST_SUCCESSFUL,
        excludeRefresh: true
    };
};

export const setTopLevelSpecialities: transferCaseTypes.setTopLevelSpecialitiesSig = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            const response = await axios.get(Api_SpecialitiesViewAll_Endpoint());
            const responseData: Api_SpecialitiesViewAll_Response = response.data;

            if (responseData.data) {
                dispatch(setPrimarySpecialities(responseData.data.specialities));
            }

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};

export const setSecondLevelSpecialities: transferCaseTypes.setSecondLevelSpecialitiesSig = (
    parentId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            const response = await axios.get(Api_SpecialitiesViewAll_Endpoint(parentId));
            const responseData: Api_SpecialitiesViewAll_Response = response.data;

            if (responseData.data) {
                dispatch(setSecondarySpecialities(responseData.data.specialities));
            }
            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};

export const setSpecialityDoctorsList: transferCaseTypes.setSpecialityDoctorsListSig = (
    selectedSpecialityID: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(transferCaseActionStart());

            const response = await axios.get(Api_DoctorsViewAll_Endpoint());
            const responseData: Api_DoctorsViewAll_Response = response.data;
            if (responseData.data) {
                const doctors = responseData.data.doctors;

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

                dispatch(setDoctorsList(filteredDoctors));
            }

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

            const payload: Api_DoctorCaseTransfersTransferCaseByDoctor_Payload = {
                speciality_id: toSpecialityId,
                doctor_id: toDoctorId
            };

            await axios.post(
                Api_DoctorCaseTransfersTransferCaseByDoctor_Endpoint(transferCase.id),
                payload
            );

            dispatch(setChatCaseReplies(transferCase, "doctor"));

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

            const payload: Api_DoctorCaseTransfersTransferCaseBySpeciality_Payload = {
                speciality_id: toSpecialityId
            };
            await axios.post(
                Api_DoctorCaseTransfersTransferCaseBySpeciality_Endpoint(transferCase.id),
                payload
            );
            dispatch(setChatCaseReplies(transferCase, "doctor"));
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

            await axios.delete(Api_DoctorCaseTransfersRemoveCaseTransfer_Endpoint(transferId));
            // const response = await axios.delete(`doctor/case_transfers/${transferId}`)
            // const data = response.data
            // console.log('response:', response)
            // console.log('data.status:', data.status)
            // console.log('data.success_message:', data.success_message)
            dispatch(setChatCaseReplies(transferCase, "doctor"));

            dispatch(transferCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(transferCaseActionError());
        }
    };
};
