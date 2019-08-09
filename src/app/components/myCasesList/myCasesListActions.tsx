import axios from "axios";
import { toast } from "react-toastify";
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
import { AppAction } from "../../types/app-action";
import {
    GetMyCasesAction,
    SortCasesListAction,
    FilterCasesAction,
    GetPendingTransfersAction
} from "./myCasesListTypes";
import { MedicalCase } from "../../types/models/MedicalCase";
import { Dispatch } from "redux";
import { User } from "../../types/models/User";
import { Doctor } from "../../types/models/Doctor";

export const myCasesListActionStart = (): AppAction => {
    return {
        type: MY_CASES_LIST_ACTION_START,
        excludeRefresh: true
    };
};

export const myCasesListActionFinish = (): AppAction => {
    return {
        type: MY_CASES_LIST_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const myCasesListActionError = (): AppAction => {
    return {
        type: MY_CASES_LIST_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getMyCases = (data: MedicalCase[]): GetMyCasesAction => {
    return {
        type: GET_MY_CASES,
        payload: data
    };
};

export const getMyCasesList = (user: User) => {
    return (dispatch: Dispatch<AppAction>) => {
        if (user.type === "doctor") {
            dispatch(getDoctorCasesList(user as Doctor));
        } else {
            dispatch(getPatientCasesList(user));
        }
    };
};

export const getDoctorCasesList = (doctor: Doctor) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            const response1 = await axios.get(`doctor/medical_cases`);
            const data1 = response1.data;
            const myCasesList = data1.data.medical_cases;

            await Promise.all(
                myCasesList.map(async oneCase => {
                    oneCase.patient_name = oneCase.patient.name;

                    oneCase.speciality_name = oneCase.speciality.title_ar;

                    const response4 = await axios.get(`case_replies/medical_case/${oneCase.id}`);
                    const data4 = response4.data;
                    const myCaseReplies = data4.data.case_replies;
                    const latestReply = myCaseReplies.sort(
                        (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
                    )[myCaseReplies.length - 1];

                    if (latestReply === undefined) {
                        oneCase.latestReply = "";
                        oneCase.is_read = true;
                    } else {
                        oneCase.latestReply = latestReply.reply;
                        oneCase.is_read =
                            latestReply.is_read === 1
                                ? true
                                : latestReply.replier_id === doctor.id
                                ? true
                                : false;
                    }
                })
            );

            const sortedCases = sortCases(myCasesList, getSorting("desc", "updated_at"));
            dispatch(getMyCases(sortedCases));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const getPatientCasesList = (patient: User) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            const response1 = await axios.get(`patient/medical_cases/${patient.id}`);
            const data1 = response1.data;
            const myCasesList = data1.data.medical_cases;

            await Promise.all(
                myCasesList.map(async oneCase => {
                    oneCase.doctor_name =
                        oneCase.doctor_id === 0 ? "لم يتم تحديد الطبيب" : oneCase.doctor.name;

                    if (oneCase.speciality.parent_id !== 0) {
                        oneCase.sub_speciality_name = oneCase.speciality.parent.title_ar;
                        oneCase.speciality_name = oneCase.speciality.title_ar;
                    } else oneCase.speciality_name = oneCase.speciality.title_ar;

                    const response4 = await axios.get(`case_replies/medical_case/${oneCase.id}`);
                    const data4 = response4.data;
                    const myCaseReplies = data4.data.case_replies;
                    const latestReply = myCaseReplies.sort(
                        (a, b) =>
                            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
                    )[myCaseReplies.length - 1];

                    if (latestReply === undefined) {
                        oneCase.latestReply = "";
                        oneCase.is_read = true;
                    } else {
                        oneCase.latestReply = latestReply.reply;
                        oneCase.is_read =
                            latestReply.is_read === 1
                                ? true
                                : latestReply.replier_id === patient.id
                                ? true
                                : false;
                    }
                })
            );

            const sortedCases = sortCases(myCasesList, getSorting("desc", "updated_at"));
            dispatch(getMyCases(sortedCases));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const sortCasesList = (
    orderBy: string,
    order: string,
    medicalCases: MedicalCase[]
): SortCasesListAction => {
    return {
        type: SORT_CASES_LIST,
        payload: {
            orderBy,
            order,
            medicalCases
        }
    };
};

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getSorting = (order, orderBy) => {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

const sortCases = (data, cmp) => {
    const sortedList = data.map((el, index) => [el, index]);
    sortedList.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return sortedList.map(el => el[0]);
};

export const sortCasesListRequest = (
    orderBy: string,
    order: string,
    medicalCases: MedicalCase[]
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());
            const sortedCases = sortCases(medicalCases, getSorting(order, orderBy));
            dispatch(sortCasesList(orderBy, order, sortedCases));
            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const filterCases = (filteredCases: MedicalCase[]): FilterCasesAction => {
    return {
        type: FILTER_CASES,
        payload: filteredCases
    };
};

export const filterCasesList = (filterBy: string, medicalCases: MedicalCase[]) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            switch (filterBy) {
                case "Open":
                    dispatch(
                        filterCases(
                            medicalCases.filter(medicalCase => medicalCase.status !== "Closed")
                        )
                    );
                    break;
                case "New":
                    dispatch(
                        filterCases(
                            medicalCases.filter(medicalCase => medicalCase.status === "Open")
                        )
                    );
                    break;
                case "Waiting for patient reply":
                    dispatch(
                        filterCases(
                            medicalCases.filter(
                                medicalCase => medicalCase.status === "Waiting for patient reply"
                            )
                        )
                    );
                    break;
                case "Waiting for doctor reply":
                    dispatch(
                        filterCases(
                            medicalCases.filter(
                                medicalCase => medicalCase.status === "Waiting for doctor reply"
                            )
                        )
                    );
                    break;
                case "Closed":
                    dispatch(
                        filterCases(
                            medicalCases.filter(medicalCase => medicalCase.status === "Closed")
                        )
                    );
                    break;
                default:
                    dispatch(filterCases(medicalCases));
            }

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const clearLists = (): AppAction => {
    return {
        type: CLEAR_CASE_LISTS
    };
};

export const clearCaseLists = () => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());
            await dispatch(clearLists());
            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const getPendingTransfers = (pendingTransfers: MedicalCase[]): GetPendingTransfersAction => {
    return {
        type: GET_PENDING_TRANSFERS,
        payload: pendingTransfers
    };
};

export const getPendingTransfersList = (toDoctorId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            const response = await axios.get(`doctor/case_transfers`);
            const data = response.data;
            const pendingTransfers = data.data.case_transfers;
            const filteredPendingTransfers = pendingTransfers.filter(
                transfer => transfer.to_doctor_id === toDoctorId && transfer.status === "Waiting"
            );
            dispatch(getPendingTransfers(filteredPendingTransfers));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const acceptCaseTransfer = (transferId: number, toDoctorId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            await axios.post(`doctor/case_transfers/accept_case_transfer/${transferId}`);
            dispatch(getPendingTransfersList(toDoctorId));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const rejectCaseTransfer = (transferId: number, toDoctorId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            await axios.post(`doctor/case_transfers/reject_case_transfer/${transferId}`);
            dispatch(getPendingTransfersList(toDoctorId));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};
