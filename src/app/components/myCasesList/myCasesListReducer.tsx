import { createReducer } from "../../reducers/reducerUtil";
import * as myCasesListConstants from "./myCasesListConstants";
import { MedicalCase } from "../../types/models/MedicalCase";
import * as myCasesListTypes from "./myCasesListTypes";
import { CaseTransfer } from "../../types/models/CaseTransfer";

export interface SortAndFilterOptions {
    order: string;
    orderBy: string;
    page: number;
    rowsPerPage: number;
}

export interface MyCasesListState {
    medicalCases: MedicalCase[];
    filteredCases: MedicalCase[];
    sortAndFilter: SortAndFilterOptions;
    loading: boolean;
    pendingTransfers: CaseTransfer[];
}

const initialState: MyCasesListState = {
    medicalCases: [],
    filteredCases: [],
    sortAndFilter: {
        order: "desc",
        orderBy: "updated_at",
        page: 0,
        rowsPerPage: 10
    },
    loading: false,
    pendingTransfers: []
};

export const myCasesListActionStarted = (state: MyCasesListState) => {
    return {
        ...state,
        loading: true
    };
};

export const myCasesListActionFinished = (state: MyCasesListState) => {
    return {
        ...state,
        loading: false
    };
};

export const myCasesListActionError = (state: MyCasesListState) => {
    return {
        ...state,
        loading: false
    };
};

export const getMyCases = (state: MyCasesListState, action: myCasesListTypes.GetMyCasesAction) => {
    return {
        ...state,
        medicalCases: action.payload,
        sortAndFilter: {
            ...state.sortAndFilter,
            order: "desc",
            orderBy: "updated_at"
        }
    };
};

export const sortCasesList = (
    state: MyCasesListState,
    action: myCasesListTypes.SortCasesListAction
) => {
    return {
        ...state,
        filteredCases: action.payload.medicalCases,
        sortAndFilter: {
            ...state.sortAndFilter,
            order: action.payload.order,
            orderBy: action.payload.orderBy
        }
    };
};

export const filterCases = (
    state: MyCasesListState,
    action: myCasesListTypes.FilterCasesAction
) => {
    return {
        ...state,
        filteredCases: action.payload
    };
};

export const clearCaseLists = (state: MyCasesListState) => {
    return {
        ...state,
        medicalCases: [],
        filteredCases: []
    };
};

export const getPendingTransfers = (
    state: MyCasesListState,
    action: myCasesListTypes.GetPendingTransfersAction
) => {
    return {
        ...state,
        pendingTransfers: action.payload
    };
};

export default createReducer<
    MyCasesListState,
    myCasesListConstants.MyCasesListActionTypes,
    myCasesListTypes.MyCasesListActions
>(initialState, {
    [myCasesListConstants.MY_CASES_LIST_ACTION_START]: myCasesListActionStarted,
    [myCasesListConstants.MY_CASES_LIST_ACTION_FINISH]: myCasesListActionFinished,
    [myCasesListConstants.MY_CASES_LIST_ACTION_ERROR]: myCasesListActionError,
    [myCasesListConstants.GET_MY_CASES]: getMyCases,
    [myCasesListConstants.SORT_CASES_LIST]: sortCasesList,
    [myCasesListConstants.FILTER_CASES]: filterCases,
    [myCasesListConstants.CLEAR_CASE_LISTS]: clearCaseLists,
    [myCasesListConstants.GET_PENDING_TRANSFERS]: getPendingTransfers
});
