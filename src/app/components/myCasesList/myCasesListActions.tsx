import axios from "axios";
import { toast } from "react-toastify";
import * as myCasesListConstants from "./myCasesListConstants";
import { AppAction } from "../../types/app-action";
import * as myCasesListTypes from "./myCasesListTypes";
import { MedicalCase } from "../../types/models/MedicalCase";
import { Dispatch } from "redux";
import { User } from "../../types/models/User";
import { Doctor } from "../../types/models/Doctor";
import { ThunkDispatch } from "redux-thunk";
import { CaseTransfer } from "../../types/models/CaseTransfer";
import { CaseReply } from "../../types/models/CaseReply";
import {
    Api_DoctorCaseTransfersAcceptCaseTransfer_Endpoint,
    Api_DoctorCaseTransfersRejectCaseTransfer_Endpoint,
    Api_DoctorMedicalCasesViewAll_Endpoint,
    Api_DoctorMedicalCasesViewAll_Response,
    Api_DoctorCaseTransfersViewAll_Endpoint,
    Api_DoctorCaseTransfersViewAll_Response
} from "../../types/api-endpoints/doctor";
import {
    Api_CaseRepliesViewAll_Endpoint,
    Api_CaseRepliesViewAll_Response
} from "../../types/api-endpoints/case-replies";
import {
    Api_PatientMedicalCasesViewAll_Endpoint,
    Api_PatientMedicalCasesViewAll_Response
} from "../../types/api-endpoints/patient";

export const myCasesListActionStart = (): myCasesListTypes.MyCasesListActionStartedAction => {
    return {
        type: myCasesListConstants.MY_CASES_LIST_ACTION_START,
        excludeRefresh: true
    };
};

export const myCasesListActionFinish = (): myCasesListTypes.MyCasesListActionFinishedAction => {
    return {
        type: myCasesListConstants.MY_CASES_LIST_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const myCasesListActionError = (): myCasesListTypes.MyCasesListActionErrorAction => {
    return {
        type: myCasesListConstants.MY_CASES_LIST_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const setMyCases = (data: MedicalCase[]): myCasesListTypes.SetMyCasesAction => {
    return {
        type: myCasesListConstants.SET_MY_CASES,
        payload: data
    };
};

export const addNewCaseToMyList = (
    medicalCase: MedicalCase
): myCasesListTypes.addNewCaseToMyListAction => {
    return {
        type: myCasesListConstants.ADD_NEW_CASE_ACTION,
        payload: medicalCase
    };
};

export const updateCaseInMyList = (
    medicalCase: MedicalCase
): myCasesListTypes.updateCaseInMyListAction => {
    return {
        type: myCasesListConstants.UPDATE_CASE_IN_MY_LIST_ACTION,
        payload: medicalCase
    };
};

export const sortCasesList = (
    orderBy: string,
    order: string,
    medicalCases: MedicalCase[]
): myCasesListTypes.SortCasesListAction => {
    return {
        type: myCasesListConstants.SORT_CASES_LIST,
        payload: {
            orderBy,
            order,
            medicalCases
        }
    };
};

export const filterCases = (filteredCases: MedicalCase[]): myCasesListTypes.FilterCasesAction => {
    return {
        type: myCasesListConstants.FILTER_CASES,
        payload: filteredCases
    };
};

export const clearLists = (): myCasesListTypes.ClearCaseListsAction => {
    return {
        type: myCasesListConstants.CLEAR_CASE_LISTS
    };
};

export const setPendingTransfers = (
    pendingTransfers: CaseTransfer[]
): myCasesListTypes.SetPendingTransfersAction => {
    return {
        type: myCasesListConstants.SET_PENDING_TRANSFERS,
        payload: pendingTransfers
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

function sortCases(data: MedicalCase[], cmp: (a: any, b: any) => number): MedicalCase[] {
    const sortedList: [MedicalCase, number][] = data.map((el, index) => [el, index]);

    sortedList.sort((a, b) => {
        const order = cmp(a[0], b[0]);

        if (order !== 0) return order;

        return a[1] - b[1];
    });

    return sortedList.map(el => el[0]);
}

export const setMyCasesList: myCasesListTypes.setMyCasesListSig = (user: User) => {
    return (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        if (user.type === "doctor") {
            dispatch(setDoctorCasesList(user as Doctor));
        } else {
            dispatch(setPatientCasesList(user));
        }
    };
};

export const setDoctorCasesList: myCasesListTypes.setDoctorCasesListSig = (doctor: Doctor) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            const response1 = await axios.get(Api_DoctorMedicalCasesViewAll_Endpoint());
            const responseData1: Api_DoctorMedicalCasesViewAll_Response = response1.data;
            let myCasesList: MedicalCase[] = [];
            if (responseData1.data) {
                myCasesList = responseData1.data.medical_cases;
            }

            myCasesList.map(oneCase => {
                oneCase.patient_name = oneCase.patient ? oneCase.patient.name : "";

                oneCase.speciality_name = oneCase.speciality.title_ar;

                return oneCase;
            });

            const sortedCases = sortCases(myCasesList, getSorting("desc", "updated_at"));
            dispatch(setMyCases(sortedCases));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const setPatientCasesList: myCasesListTypes.setPatientCasesListSig = (patient: User) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            let myCasesList: MedicalCase[] = [];
            const response1 = await axios.get(Api_PatientMedicalCasesViewAll_Endpoint(patient.id));
            const responseData1: Api_PatientMedicalCasesViewAll_Response = response1.data;
            if (responseData1.data) {
                myCasesList = responseData1.data.medical_cases;

                myCasesList.map(oneCase => {
                    oneCase.doctor_name =
                        oneCase.doctor_id === 0
                            ? "لم يتم تحديد الطبيب"
                            : oneCase.doctor
                            ? oneCase.doctor.name
                            : "";

                    if (oneCase.speciality.parent_id !== 0) {
                        oneCase.sub_speciality_name = oneCase.speciality.parent
                            ? oneCase.speciality.parent.title_ar
                            : "";
                        oneCase.speciality_name = oneCase.speciality.title_ar;
                    } else {
                        oneCase.speciality_name = oneCase.speciality.title_ar;
                    }

                    return oneCase;
                });

                const sortedCases = sortCases(myCasesList, getSorting("desc", "updated_at"));
                if (sortedCases) {
                    dispatch(setMyCases(sortedCases));
                }
            }

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const sortCasesListRequest: myCasesListTypes.sortCasesListRequestSig = (
    orderBy: string,
    order: string,
    medicalCases: MedicalCase[]
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
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

export const filterCasesList: myCasesListTypes.filterCasesListSig = (
    filterBy: string,
    medicalCases: MedicalCase[]
) => {
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

export const clearCaseLists: myCasesListTypes.clearCaseListsSig = () => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
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

export const setPendingTransfersList: myCasesListTypes.setPendingTransfersListSig = (
    toDoctorId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            let pendingTransfers: CaseTransfer[] = [];
            const response = await axios.get(Api_DoctorCaseTransfersViewAll_Endpoint());
            const responseData: Api_DoctorCaseTransfersViewAll_Response = response.data;
            if (responseData.data) {
                pendingTransfers = responseData.data.case_transfers;

                const filteredPendingTransfers = pendingTransfers.filter(
                    transfer =>
                        transfer.to_doctor_id === toDoctorId && transfer.status === "Waiting"
                );

                dispatch(setPendingTransfers(filteredPendingTransfers));
            }

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const acceptCaseTransfer: myCasesListTypes.acceptCaseTransferSig = (
    transferId: number,
    toDoctorId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            await axios.post(Api_DoctorCaseTransfersAcceptCaseTransfer_Endpoint(transferId));
            dispatch(setPendingTransfersList(toDoctorId));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

export const rejectCaseTransfer: myCasesListTypes.rejectCaseTransferSig = (
    transferId: number,
    toDoctorId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            await axios.post(Api_DoctorCaseTransfersRejectCaseTransfer_Endpoint(transferId));
            dispatch(setPendingTransfersList(toDoctorId));

            dispatch(myCasesListActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};

/** use this function as a template to edit the backend to return these fields: latestReply, is_read */
export const asyncSetMedicalCaseReplies = (medicalCase: MedicalCase, user: User) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(myCasesListActionStart());

            let myCaseReplies: CaseReply[] = [];
            let latestReply: CaseReply | null = null;

            const response = await axios.get(Api_CaseRepliesViewAll_Endpoint(medicalCase.id));
            const responseData: Api_CaseRepliesViewAll_Response = response.data;
            if (responseData.data) {
                myCaseReplies = responseData.data.case_replies;
                latestReply = myCaseReplies.sort(
                    (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
                )[myCaseReplies.length - 1];
            }

            if (latestReply) {
                medicalCase.latestReply = latestReply.reply;
                medicalCase.is_read =
                    latestReply.is_read === 1
                        ? true
                        : latestReply.replier_id === user.id
                        ? true
                        : false;
            } else {
                medicalCase.latestReply = "";
                medicalCase.is_read = true;
            }
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(myCasesListActionError());
        }
    };
};
