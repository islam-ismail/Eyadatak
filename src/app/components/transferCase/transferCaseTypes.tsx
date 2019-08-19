import * as transferCaseConstants from "./transferCaseConstants";
import { AppAction } from "../../types/app-action";
import { MedicalCase } from "../../types/models/MedicalCase";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";

export interface DoctorsWithSpecialities {
    key: number;
    value: string;
    specialityId: number;
}

export interface GetDoctorsListAction extends AppAction {
    type: typeof transferCaseConstants.GET_SPECIALITY_DOCTORS;
    payload: DoctorsWithSpecialities[];
}

export interface TransferRequestSuccessfulAction extends AppAction {
    type: typeof transferCaseConstants.TRANSFER_REQUEST_SUCCESSFUL;
    excludeRefresh: boolean;
}

export interface TransferCaseActionStartAction extends AppAction {
    type: typeof transferCaseConstants.TRANSFER_CASE_ACTION_START;
    excludeRefresh: boolean;
}

export interface TransferCaseActionFinishAction extends AppAction {
    type: typeof transferCaseConstants.TRANSFER_CASE_ACTION_FINISH;
    excludeRefresh: boolean;
}

export interface TransferCaseActionErrorAction extends AppAction {
    type: typeof transferCaseConstants.TRANSFER_CASE_ACTION_ERROR;
    excludeRefresh: boolean;
}

export type TransferCaseActions = GetDoctorsListAction &
    TransferRequestSuccessfulAction &
    TransferCaseActionStartAction &
    TransferCaseActionFinishAction &
    TransferCaseActionErrorAction;

export type deleteTransferSig = (
    transferCase: MedicalCase,
    transferId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type transferCaseToSpecialitySig = (
    transferCase: MedicalCase,
    toSpecialityId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type transferCaseToDoctorSig = (
    transferCase: MedicalCase,
    toDoctorId: number,
    toSpecialityId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type getSpecialityDoctorsListSig = (
    selectedSpecialityID: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type getSecondLevelSpecialitiesSig = (
    parentId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type getTopLevelSpecialitiesSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface TransferCaseActionsSignatures {
    getSecondLevelSpecialities: getSecondLevelSpecialitiesSig;
    getSpecialityDoctorsList: getSpecialityDoctorsListSig;
    getTopLevelSpecialities: getTopLevelSpecialitiesSig;
    transferCaseToDoctor: transferCaseToDoctorSig;
    transferCaseToSpeciality: transferCaseToSpecialitySig;
    deleteTransfer: deleteTransferSig;
}
