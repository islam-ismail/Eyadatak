import { createReducer } from "../../reducers/reducerUtil";
import * as transferCaseConstants from "./transferCaseConstants";
import * as transferCaseTypes from "./transferCaseTypes";

export interface TransferCaseState {
    specialityDoctorsList: transferCaseTypes.DoctorsWithSpecialities[];
    transferRequestedSuccessfully: boolean;
    loading?: boolean;
}

const initialState: TransferCaseState = {
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

export const getSpecialityDoctors = (
    state: TransferCaseState,
    action: transferCaseTypes.GetDoctorsListAction
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
>(initialState, {
    [transferCaseConstants.TRANSFER_CASE_ACTION_START]: transferCaseActionStarted,
    [transferCaseConstants.TRANSFER_CASE_ACTION_FINISH]: transferCaseActionFinished,
    [transferCaseConstants.TRANSFER_CASE_ACTION_ERROR]: transferCaseActionError,
    [transferCaseConstants.GET_SPECIALITY_DOCTORS]: getSpecialityDoctors,
    [transferCaseConstants.TRANSFER_REQUEST_SUCCESSFUL]: transferRequestSuccessful
});
