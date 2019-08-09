import { createReducer } from "../../reducers/reducerUtil";
import {
    MY_CASES_LIST_ACTION_START,
    MY_CASES_LIST_ACTION_FINISH,
    MY_CASES_LIST_ACTION_ERROR,
    GET_MY_CASES,
    SORT_CASES_LIST,
    FILTER_CASES,
    CLEAR_CASE_LISTS,
    GET_PENDING_TRANSFERS
} from "./myCasesListConstants";
import { MedicalCase } from "../../types/models/MedicalCase";

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
    pendingTransfers: MedicalCase[];
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

export const myCasesListActionStarted = (state: MyCasesListState, payload: any) => {
    return {
        ...state,
        loading: true
    };
};

export const myCasesListActionFinished = (state: MyCasesListState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const myCasesListActionError = (state: MyCasesListState, payload: any) => {
    return {
        ...state,
        loading: false
    };
};

export const getMyCases = (state: MyCasesListState, payload: MedicalCase[]) => {
    return {
        ...state,
        medicalCases: payload,
        sortAndFilter: {
            ...state.sortAndFilter,
            order: "desc",
            orderBy: "updated_at"
        }
    };
};

export const sortCasesList = (
    state: MyCasesListState,
    payload: { medicalCases: MedicalCase[]; order: string; orderBy: string }
) => {
    return {
        ...state,
        filteredCases: payload.medicalCases,
        sortAndFilter: {
            ...state.sortAndFilter,
            order: payload.order,
            orderBy: payload.orderBy
        }
    };
};

export const filterCases = (state: MyCasesListState, payload: MedicalCase[]) => {
    return {
        ...state,
        filteredCases: payload
    };
};

export const clearCaseLists = (state: MyCasesListState) => {
    return {
        ...state,
        medicalCases: [],
        filteredCases: []
    };
};

export const getPendingTransfers = (state: MyCasesListState, payload: MedicalCase[]) => {
    return {
        ...state,
        pendingTransfers: payload
    };
};

export default createReducer(initialState, {
    [MY_CASES_LIST_ACTION_START]: myCasesListActionStarted,
    [MY_CASES_LIST_ACTION_FINISH]: myCasesListActionFinished,
    [MY_CASES_LIST_ACTION_ERROR]: myCasesListActionError,
    [GET_MY_CASES]: getMyCases,
    [SORT_CASES_LIST]: sortCasesList,
    [FILTER_CASES]: filterCases,
    [CLEAR_CASE_LISTS]: clearCaseLists,
    [GET_PENDING_TRANSFERS]: getPendingTransfers
});
