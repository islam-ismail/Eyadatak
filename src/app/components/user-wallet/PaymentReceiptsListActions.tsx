import axios from "axios";
import { toast } from "react-toastify";
import * as paymentReceiptsListConstants from "./PaymentReceiptsListConstants";
import { AppAction } from "../../types/app-action";
import * as paymentReceiptsListTypes from "./PaymentReceiptsListTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
    Api_PaymentPaymentReceipts_Endpoint,
    Api_PaymentPaymentReceipts_Response
} from "../../types/api-endpoints/payment";
import { PaymentReceipt } from "../../types/models/PaymentReceipt";

export const paymentReceiptsListActionStart = (): paymentReceiptsListTypes.PaymentReceiptsListActionStartedAction => {
    return {
        type: paymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_START,
        excludeRefresh: true
    };
};

export const paymentReceiptsListActionFinish = (): paymentReceiptsListTypes.PaymentReceiptsListActionFinishedAction => {
    return {
        type: paymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const paymentReceiptsListActionError = (): paymentReceiptsListTypes.PaymentReceiptsListActionErrorAction => {
    return {
        type: paymentReceiptsListConstants.PAYMENT_RECEIPTS_LIST_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const setPaymentReceipts = (
    data: PaymentReceipt[]
): paymentReceiptsListTypes.SetPaymentReceiptsAction => {
    return {
        type: paymentReceiptsListConstants.SET_PAYMENT_RECEIPTS,
        payload: data
    };
};

export const sortReceiptsList = (
    orderBy: string,
    order: string,
    paymentReceipts: PaymentReceipt[]
): paymentReceiptsListTypes.SortReceiptsListAction => {
    return {
        type: paymentReceiptsListConstants.SORT_RECEIPTS_LIST,
        payload: {
            orderBy,
            order,
            paymentReceipts
        }
    };
};

export const filterReceipts = (
    filteredReceipts: PaymentReceipt[]
): paymentReceiptsListTypes.FilterReceiptsAction => {
    return {
        type: paymentReceiptsListConstants.FILTER_RECEIPTS,
        payload: filteredReceipts
    };
};

export const clearLists = (): paymentReceiptsListTypes.ClearReceiptListsAction => {
    return {
        type: paymentReceiptsListConstants.CLEAR_RECEIPT_LISTS
    };
};

export const setPaymentReceiptsList: paymentReceiptsListTypes.setPaymentReceiptsListSig = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(paymentReceiptsListActionStart());

            let paymentReceiptsList: PaymentReceipt[] = [];
            const response1 = await axios.get(Api_PaymentPaymentReceipts_Endpoint());
            const responseData1: Api_PaymentPaymentReceipts_Response = response1.data;
            if (responseData1.data) {
                paymentReceiptsList = responseData1.data.payment_receipts;

                const sortedReceipts = sortReceipts(
                    paymentReceiptsList,
                    getSorting("desc", "updated_at")
                );
                if (sortedReceipts) {
                    dispatch(setPaymentReceipts(sortedReceipts));
                }
            }

            dispatch(paymentReceiptsListActionFinish());
        } catch (error) {
            console.log("error:", error);
            if (error.response && error.response.data.error_message) {
                toast.error(error.response.data.error_message);
            }
            dispatch(paymentReceiptsListActionError());
        }
    };
};

export const sortReceiptsListRequest: paymentReceiptsListTypes.sortReceiptsListRequestSig = (
    orderBy: string,
    order: string,
    paymentReceipts: PaymentReceipt[]
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(paymentReceiptsListActionStart());
            const sortedReceipts = sortReceipts(paymentReceipts, getSorting(order, orderBy));
            dispatch(sortReceiptsList(orderBy, order, sortedReceipts));
            dispatch(paymentReceiptsListActionFinish());
        } catch (error) {
            console.log("error:", error);
            if (error.response && error.response.data.error_message) {
                toast.error(error.response.data.error_message);
            }
            dispatch(paymentReceiptsListActionError());
        }
    };
};

export const filterReceiptsList: paymentReceiptsListTypes.filterReceiptsListSig = (
    filterBy: string,
    paymentReceipts: PaymentReceipt[]
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(paymentReceiptsListActionStart());

            switch (filterBy) {
                case "Complete":
                    dispatch(
                        filterReceipts(
                            paymentReceipts.filter(paymentReceipt => paymentReceipt.completed === 1)
                        )
                    );
                    break;
                case "InComplete":
                    dispatch(
                        filterReceipts(
                            paymentReceipts.filter(paymentReceipt => paymentReceipt.completed === 0)
                        )
                    );
                    break;
                default:
                    dispatch(filterReceipts(paymentReceipts));
            }

            dispatch(paymentReceiptsListActionFinish());
        } catch (error) {
            console.log("error:", error);
            if (error.response && error.response.data.error_message) {
                toast.error(error.response.data.error_message);
            }
            dispatch(paymentReceiptsListActionError());
        }
    };
};

export const clearReceiptLists: paymentReceiptsListTypes.clearReceiptListsSig = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(paymentReceiptsListActionStart());
            await dispatch(clearLists());
            dispatch(paymentReceiptsListActionFinish());
        } catch (error) {
            console.log("error:", error);
            if (error.response && error.response.data.error_message) {
                toast.error(error.response.data.error_message);
            }
            dispatch(paymentReceiptsListActionError());
        }
    };
};

function desc(a: any, b: any, orderBy: string): number {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getSorting(order: string, orderBy: string): (a: any, b: any) => number {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function sortReceipts(data: PaymentReceipt[], cmp: (a: any, b: any) => number): PaymentReceipt[] {
    const sortedList: [PaymentReceipt, number][] = data.map((el, index) => [el, index]);

    sortedList.sort((a, b) => {
        const order = cmp(a[0], b[0]);

        if (order !== 0) return order;

        return a[1] - b[1];
    });

    return sortedList.map(el => el[0]);
}
