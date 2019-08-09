import { createReducer } from "../../reducers/reducerUtil";
import {
    TRANSFER_CASE_ACTION_START,
    TRANSFER_CASE_ACTION_FINISH,
    TRANSFER_CASE_ACTION_ERROR,
    GET_SPECIALITY_DOCTORS,
    TRANSFER_REQUEST_SUCCESSFUL
} from "./transferCaseConstants";
import { Doctor } from "../../types/models/Doctor";

export interface TransferCaseState {
    specialityDoctorsList: Doctor[];
    transferRequestedSuccessfully: boolean;
    loading?: boolean;
}

const initialState: TransferCaseState = {
    specialityDoctorsList: [],
    transferRequestedSuccessfully: false
};

export const transferCaseActionStarted = (
    state: TransferCaseState,
    payload: any
): TransferCaseState => {
    return {
        ...state,
        loading: true
    };
};

export const transferCaseActionFinished = (
    state: TransferCaseState,
    payload: any
): TransferCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const transferCaseActionError = (
    state: TransferCaseState,
    payload: any
): TransferCaseState => {
    return {
        ...state,
        loading: false
    };
};

export const getSpecialityDoctors = (
    state: TransferCaseState,
    payload: Doctor[]
): TransferCaseState => {
    return {
        ...state,
        specialityDoctorsList: payload
    };
};

export const transferRequestSuccessful = (
    state: TransferCaseState,
    payload: any
): TransferCaseState => {
    return {
        ...state,
        transferRequestedSuccessfully: true
    };
};

export default createReducer(initialState, {
    [TRANSFER_CASE_ACTION_START]: transferCaseActionStarted,
    [TRANSFER_CASE_ACTION_FINISH]: transferCaseActionFinished,
    [TRANSFER_CASE_ACTION_ERROR]: transferCaseActionError,
    [GET_SPECIALITY_DOCTORS]: getSpecialityDoctors,
    [TRANSFER_REQUEST_SUCCESSFUL]: transferRequestSuccessful
});
