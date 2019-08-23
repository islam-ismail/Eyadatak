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

export interface SetDoctorsListAction extends AppAction {
    type: typeof transferCaseConstants.SET_SPECIALITY_DOCTORS;
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

export type TransferCaseActions = SetDoctorsListAction &
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

export type setSpecialityDoctorsListSig = (
    selectedSpecialityID: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type setSecondLevelSpecialitiesSig = (
    parentId: number
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type setTopLevelSpecialitiesSig = () => (dispatch: Dispatch<AppAction>) => Promise<void>;

export interface TransferCaseActionsSignatures {
    setSecondLevelSpecialities: setSecondLevelSpecialitiesSig;
    setSpecialityDoctorsList: setSpecialityDoctorsListSig;
    setTopLevelSpecialities: setTopLevelSpecialitiesSig;
    transferCaseToDoctor: transferCaseToDoctorSig;
    transferCaseToSpeciality: transferCaseToSpecialitySig;
    deleteTransfer: deleteTransferSig;
}
