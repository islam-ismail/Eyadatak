import { AppAction } from "../../types/app-action";
import * as myCasesListConstants from "./myCasesListConstants";
import { MedicalCase } from "../../types/models/MedicalCase";
import { CaseTransfer } from "../../types/models/CaseTransfer";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { User } from "../../types/models/User";
import { Doctor } from "../../types/models/Doctor";

/**
 * actions signature
 */
export interface SetMyCasesAction extends AppAction {
    type: typeof myCasesListConstants.SET_MY_CASES;
    payload: MedicalCase[];
}

export interface addNewCaseToMyListAction extends AppAction {
    type: typeof myCasesListConstants.ADD_NEW_CASE_ACTION;
    payload: MedicalCase;
}

export interface SortCasesListAction extends AppAction {
    type: typeof myCasesListConstants.SORT_CASES_LIST;
    payload: {
        orderBy: string;
        order: string;
        medicalCases: MedicalCase[];
    };
}

export interface FilterCasesAction extends AppAction {
    type: typeof myCasesListConstants.FILTER_CASES;
    payload: MedicalCase[];
}

export interface SetPendingTransfersAction extends AppAction {
    type: typeof myCasesListConstants.SET_PENDING_TRANSFERS;
    payload: CaseTransfer[];
}

export interface MyCasesListActionStartedAction extends AppAction {
    type: typeof myCasesListConstants.MY_CASES_LIST_ACTION_START;
}

export interface MyCasesListActionFinishedAction extends AppAction {
    type: typeof myCasesListConstants.MY_CASES_LIST_ACTION_FINISH;
}

export interface MyCasesListActionErrorAction extends AppAction {
    type: typeof myCasesListConstants.MY_CASES_LIST_ACTION_ERROR;
}

export interface ClearCaseListsAction extends AppAction {
    type: typeof myCasesListConstants.CLEAR_CASE_LISTS;
}

export interface updateCaseInMyListAction extends AppAction {
    type: typeof myCasesListConstants.UPDATE_CASE_IN_MY_LIST_ACTION;
    payload: MedicalCase;
}

export type MyCasesListActions = SetMyCasesAction &
    SortCasesListAction &
    FilterCasesAction &
    SetPendingTransfersAction &
    MyCasesListActionStartedAction &
    MyCasesListActionFinishedAction &
    MyCasesListActionErrorAction &
    ClearCaseListsAction &
    addNewCaseToMyListAction &
    updateCaseInMyListAction;

/**
 * action creators signature
 */
export type rejectCaseTransferSig = (
    transferId: number,
    toDoctorId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type acceptCaseTransferSig = (
    transferId: number,
    toDoctorId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type setPendingTransfersListSig = (
    toDoctorId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type clearCaseListsSig = () => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type filterCasesListSig = (
    filterBy: string,
    medicalCases: MedicalCase[]
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type sortCasesListRequestSig = (
    orderBy: string,
    order: string,
    medicalCases: MedicalCase[]
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type setPatientCasesListSig = (
    patient: User
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type setDoctorCasesListSig = (
    doctor: Doctor
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type setMyCasesListSig = (
    user: User
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => void;

export interface MyCasesListActionsSignatures {
    rejectCaseTransfer: (transferId: number, toDoctorId: number) => Promise<void>;
    acceptCaseTransfer: (transferId: number, toDoctorId: number) => Promise<void>;
    setPendingTransfersList: (toDoctorId: number) => Promise<void>;
    clearCaseLists: () => Promise<void>;
    filterCasesList: (filterBy: string, medicalCases: MedicalCase[]) => Promise<void>;
    sortCasesListRequest: (
        orderBy: string,
        order: string,
        medicalCases: MedicalCase[]
    ) => Promise<void>;
    setPatientCasesList: (patient: User) => Promise<void>;
    setDoctorCasesList: (doctor: Doctor) => Promise<void>;
    setMyCasesList: (user: User) => void;
    updateCaseInMyList(medicalCase: MedicalCase): updateCaseInMyListAction;
}
