import { AppAction } from "../../types/app-action";
import {
    GET_MY_CASES,
    SORT_CASES_LIST,
    FILTER_CASES,
    GET_PENDING_TRANSFERS
} from "./myCasesListConstants";
import { MedicalCase } from "../../types/models/MedicalCase";

export interface GetMyCasesAction extends AppAction {
    type: typeof GET_MY_CASES;
    payload: MedicalCase[];
}

export interface SortCasesListAction extends AppAction {
    type: typeof SORT_CASES_LIST;
    payload: {
        orderBy: string;
        order: string;
        medicalCases: MedicalCase[];
    };
}

export interface FilterCasesAction extends AppAction {
    type: typeof FILTER_CASES;
    payload: MedicalCase[];
}

export interface GetPendingTransfersAction extends AppAction {
    type: typeof GET_PENDING_TRANSFERS;
    payload: MedicalCase[];
}
