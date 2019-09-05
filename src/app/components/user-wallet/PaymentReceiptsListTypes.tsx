import { AppAction } from "../../types/app-action";
import * as paymentReceiptsListConstants from "./PaymentReceiptsListConstants";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { PaymentReceipt } from "../../types/models/PaymentReceipt";

/**
 * actions signature
 */
export interface SetPaymentReceiptsAction extends AppAction {
    type: typeof paymentReceiptsListConstants.SET_PAYMENT_RECEIPTS;
    payload: PaymentReceipt[];
}

export interface SortReceiptsListAction extends AppAction {
    type: typeof paymentReceiptsListConstants.SORT_RECEIPTS_LIST;
    payload: {
        orderBy: string;
        order: string;
        paymentReceipts: PaymentReceipt[];
    };
}

export interface FilterReceiptsAction extends AppAction {
    type: typeof paymentReceiptsListConstants.FILTER_RECEIPTS;
    payload: PaymentReceipt[];
}

export interface PaymentReceiptsListActionStartedAction extends AppAction {
    type: typeof paymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_START;
}

export interface PaymentReceiptsListActionFinishedAction extends AppAction {
    type: typeof paymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_FINISH;
}

export interface PaymentReceiptsListActionErrorAction extends AppAction {
    type: typeof paymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_ERROR;
}

export interface ClearReceiptListsAction extends AppAction {
    type: typeof paymentReceiptsListConstants.CLEAR_RECEIPT_LISTS;
}

export type PaymentReceiptsListActions = SetPaymentReceiptsAction &
    SortReceiptsListAction &
    FilterReceiptsAction &
    PaymentReceiptsListActionStartedAction &
    PaymentReceiptsListActionFinishedAction &
    PaymentReceiptsListActionErrorAction &
    ClearReceiptListsAction;

/**
 * action creators signature
 */
export type clearReceiptListsSig = () => (
    dispatch: ThunkDispatch<{}, {}, AppAction>
) => Promise<void>;

export type filterReceiptsListSig = (
    filterBy: string,
    paymentReceipts: PaymentReceipt[]
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type sortReceiptsListRequestSig = (
    orderBy: string,
    order: string,
    paymentReceipts: PaymentReceipt[]
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type setPaymentReceiptsListSig = () => (dispatch: ThunkDispatch<{}, {}, AppAction>) => void;

export interface PaymentReceiptsListActionsSignatures {
    clearReceiptLists: () => Promise<void>;
    filterReceiptsList: (filterBy: string, paymentReceipts: PaymentReceipt[]) => Promise<void>;
    sortReceiptsListRequest: (
        orderBy: string,
        order: string,
        paymentReceipts: PaymentReceipt[]
    ) => Promise<void>;
    setPaymentReceiptsList: () => void;
}
