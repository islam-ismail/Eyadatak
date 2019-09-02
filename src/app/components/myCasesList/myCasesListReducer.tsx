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

export const initialMyCasesListState: MyCasesListState = {
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

export const addNewCase = (
    state: MyCasesListState,
    action: myCasesListTypes.addNewCaseToMyListAction
) => {
    return {
        ...state,
        medicalCases: [...state.medicalCases, action.payload]
    };
};

export const updateCaseInMyListAction = (
    state: MyCasesListState,
    action: myCasesListTypes.updateCaseInMyListAction
) => {
    const mcs = state.medicalCases.filter(mc => mc.id !== action.payload.id);

    return {
        ...state,
        medicalCases: [...mcs, action.payload]
    };
};

export const setMyCases = (state: MyCasesListState, action: myCasesListTypes.SetMyCasesAction) => {
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

export const setPendingTransfers = (
    state: MyCasesListState,
    action: myCasesListTypes.SetPendingTransfersAction
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
>(initialMyCasesListState, {
    [myCasesListConstants.ADD_NEW_CASE_ACTION]: addNewCase,
    [myCasesListConstants.MY_CASES_LIST_ACTION_START]: myCasesListActionStarted,
    [myCasesListConstants.MY_CASES_LIST_ACTION_FINISH]: myCasesListActionFinished,
    [myCasesListConstants.MY_CASES_LIST_ACTION_ERROR]: myCasesListActionError,
    [myCasesListConstants.SET_MY_CASES]: setMyCases,
    [myCasesListConstants.SORT_CASES_LIST]: sortCasesList,
    [myCasesListConstants.FILTER_CASES]: filterCases,
    [myCasesListConstants.CLEAR_CASE_LISTS]: clearCaseLists,
    [myCasesListConstants.SET_PENDING_TRANSFERS]: setPendingTransfers,
    [myCasesListConstants.UPDATE_CASE_IN_MY_LIST_ACTION]: updateCaseInMyListAction
});
