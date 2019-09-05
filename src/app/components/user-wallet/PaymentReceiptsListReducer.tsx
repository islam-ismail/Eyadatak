import { createReducer } from "../../reducers/reducerUtil";
import * as PaymentReceiptsListConstants from "./PaymentReceiptsListConstants";
import { PaymentReceipt } from "../../types/models/PaymentReceipt";
import * as PaymentReceiptsListTypes from "./PaymentReceiptsListTypes";

export interface SortAndFilterOptions {
    order: string;
    orderBy: string;
    page: number;
    rowsPerPage: number;
}

export interface PaymentReceiptsListState {
    paymentReceipts: PaymentReceipt[];
    filteredReceipts: PaymentReceipt[];
    sortAndFilter: SortAndFilterOptions;
    loading: boolean;
}

export const initialPaymentReceiptsListState: PaymentReceiptsListState = {
    paymentReceipts: [],
    filteredReceipts: [],
    sortAndFilter: {
        order: "desc",
        orderBy: "updated_at",
        page: 0,
        rowsPerPage: 10
    },
    loading: false
};

export const PaymentReceiptsListActionStarted = (state: PaymentReceiptsListState) => {
    return {
        ...state,
        loading: true
    };
};

export const PaymentReceiptsListActionFinished = (state: PaymentReceiptsListState) => {
    return {
        ...state,
        loading: false
    };
};

export const PaymentReceiptsListActionError = (state: PaymentReceiptsListState) => {
    return {
        ...state,
        loading: false
    };
};

export const setPaymentReceipts = (
    state: PaymentReceiptsListState,
    action: PaymentReceiptsListTypes.SetPaymentReceiptsAction
) => {
    return {
        ...state,
        paymentReceipts: action.payload,
        sortAndFilter: {
            ...state.sortAndFilter,
            order: "desc",
            orderBy: "updated_at"
        }
    };
};

export const sortReceiptsList = (
    state: PaymentReceiptsListState,
    action: PaymentReceiptsListTypes.SortReceiptsListAction
) => {
    return {
        ...state,
        filteredReceipts: action.payload.paymentReceipts,
        sortAndFilter: {
            ...state.sortAndFilter,
            order: action.payload.order,
            orderBy: action.payload.orderBy
        }
    };
};

export const filterReceipts = (
    state: PaymentReceiptsListState,
    action: PaymentReceiptsListTypes.FilterReceiptsAction
) => {
    return {
        ...state,
        filteredReceipts: action.payload
    };
};

export const clearReceiptLists = (state: PaymentReceiptsListState) => {
    return {
        ...state,
        paymentReceipts: [],
        filteredReceipts: []
    };
};

export default createReducer<
    PaymentReceiptsListState,
    PaymentReceiptsListConstants.PaymentReceiptsListActionTypes,
    PaymentReceiptsListTypes.PaymentReceiptsListActions
>(initialPaymentReceiptsListState, {
    [PaymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_START]: PaymentReceiptsListActionStarted,
    [PaymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_FINISH]: PaymentReceiptsListActionFinished,
    [PaymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_ERROR]: PaymentReceiptsListActionError,
    [PaymentReceiptsListConstants.SET_PAYMENT_RECEIPTS]: setPaymentReceipts,
    [PaymentReceiptsListConstants.SORT_RECEIPTS_LIST]: sortReceiptsList,
    [PaymentReceiptsListConstants.FILTER_RECEIPTS]: filterReceipts,
    [PaymentReceiptsListConstants.CLEAR_RECEIPT_LISTS]: clearReceiptLists
});
