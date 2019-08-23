import { createReducer } from "../../reducers/reducerUtil";
import * as transferCaseConstants from "./transferCaseConstants";
import * as transferCaseTypes from "./transferCaseTypes";

export interface TransferCaseState {
    specialityDoctorsList: transferCaseTypes.DoctorsWithSpecialities[];
    transferRequestedSuccessfully: boolean;
    loading?: boolean;
}

export const initialTransferCaseState: TransferCaseState = {
    specialityDoctorsList: [],
    transferRequestedSuccessfully: false
};

export const transferCaseActionStarted = (state: TransferCaseState): TransferCaseState => {
    return {
        ...state,
        loading: true
    };
};

export const transferCaseActionFinished = (state: TransferCaseState): TransferCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const transferCaseActionError = (state: TransferCaseState): TransferCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const setSpecialityDoctors = (
    state: TransferCaseState,
    action: transferCaseTypes.SetDoctorsListAction
): TransferCaseState => {
    return {
        ...state,
        specialityDoctorsList: action.payload
    };
};

export const transferRequestSuccessful = (state: TransferCaseState): TransferCaseState => {
    return {
        ...state,
        transferRequestedSuccessfully: true
    };
};

export default createReducer<
    TransferCaseState,
    transferCaseConstants.TransferCaseActionTypes,
    transferCaseTypes.TransferCaseActions
>(initialTransferCaseState, {
    [transferCaseConstants.TRANSFER_CASE_ACTION_START]: transferCaseActionStarted,
    [transferCaseConstants.TRANSFER_CASE_ACTION_FINISH]: transferCaseActionFinished,
    [transferCaseConstants.TRANSFER_CASE_ACTION_ERROR]: transferCaseActionError,
    [transferCaseConstants.SET_SPECIALITY_DOCTORS]: setSpecialityDoctors,
    [transferCaseConstants.TRANSFER_REQUEST_SUCCESSFUL]: transferRequestSuccessful
});
