import axios from "axios";
import { toast } from "react-toastify";
import {
    HISTORY_ACCESS_ACTION_START,
    HISTORY_ACCESS_ACTION_FINISH,
    HISTORY_ACCESS_ACTION_ERROR,
    REQUEST_FULL_ACCESS,
    REQUEST_SPECIALITY_ACCESS,
    GET_REQUEST_STATUS_AND_ACCESS_LEVEL,
    GET_HISTORY_CASES
} from "./historyAccessConstants";
import { AppAction } from "../../../types/app-action";
import { GetRequestStatusAction, GetApprovedHistoryCasesAction } from "./historyAccessTypes";
import { MedicalCase } from "../../../types/models/MedicalCase";
import { PatientHistoryAccess } from "../../../types/models/PatientHistoryAccess";
import { Dispatch } from "redux";
import { User } from "../../../types/models/User";

export const historyAccessActionStart = (): AppAction => {
    return {
        type: HISTORY_ACCESS_ACTION_START,
        excludeRefresh: true
    };
};

export const historyAccessActionFinish = (): AppAction => {
    return {
        type: HISTORY_ACCESS_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const historyAccessActionError = (): AppAction => {
    return {
        type: HISTORY_ACCESS_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const requestFullHistoryAccess = (): AppAction => {
    return {
        type: REQUEST_FULL_ACCESS
    };
};

export const requestSpecialityHistoryAccess = (): AppAction => {
    return {
        type: REQUEST_SPECIALITY_ACCESS
    };
};

export const requestHistoryAccess = (accessLevel: string, caseId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(historyAccessActionStart());

            await axios.post(`doctor/patient_history_access/${caseId}`, {
                access_level: accessLevel
            });

            dispatch(historyAccessActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(historyAccessActionError());
        }
    };
};

export const getRequestStatus = (
    allAccessRequests: PatientHistoryAccess[],
    requestStatus: string,
    accessLevel: string,
    historyAccessId: number,
    waitingApproval: boolean,
    waitingLevel: string
    // allDeclined,
    // specialityDeclined
): GetRequestStatusAction => {
    return {
        type: GET_REQUEST_STATUS_AND_ACCESS_LEVEL,
        payload: {
            requestStatus: requestStatus,
            accessLevel: accessLevel,
            historyAccessId: historyAccessId,
            waitingApproval: waitingApproval,
            waitingLevel: waitingLevel,
            allAccessRequests: allAccessRequests
        }
    };
};

export const getApprovedHistoryCases = (
    historyCases: MedicalCase[]
): GetApprovedHistoryCasesAction => {
    return {
        type: GET_HISTORY_CASES,
        payload: historyCases
    };
};

export const getHistoryCases = (patientId: number, accessLevel: string, specialityId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        const response = await axios.get(`doctor/patient_history_access/patient/${patientId}`);
        const data = response.data;
        const allCases: MedicalCase[] = data.data.medical_cases;

        const filteredHistoryCases =
            accessLevel === "All"
                ? allCases
                : allCases.filter(historyCase => historyCase.speciality_id === specialityId);

        const historyCases: MedicalCase[] = [];
        await Promise.all(
            filteredHistoryCases.map(async filteredHistoryCase => {
                const response2 = await axios.get(`medical_cases/${filteredHistoryCase.id}`);
                const data2 = response2.data;
                const retrievedCase = data2.data.medical_case;
                historyCases.push(retrievedCase);
            })
        );

        dispatch(getApprovedHistoryCases(historyCases));
    };
};

export const getAccessRequestStatus = (
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number,
    clearFirst: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(historyAccessActionStart());
            if (clearFirst) {
                dispatch(getRequestStatus([], "", "", 0, false, ""));
            }

            const requestURL =
                user.type === "doctor"
                    ? `doctor/patient_history_access/medical_case/${caseId}`
                    : `patient/patient_history_access/medical_case/${caseId}`;
            const response = await axios.get(requestURL);
            const data = response.data;
            const historyAccesses: PatientHistoryAccess[] = data.data.history_accesses;

            let allAccessRequests: PatientHistoryAccess[] = [];
            let requestStatus: string = "";
            let accessLevel: string = "";
            let historyAccessId: number = 0;
            let waitingApproval: boolean = false;
            let waitingLevel: string = "";

            if (historyAccesses && historyAccesses.length !== 0) {
                allAccessRequests =
                    user.type === "doctor"
                        ? historyAccesses
                              .filter(historyAccess => historyAccess.case_id === caseId)
                              .filter(
                                  filteredHistoryAccess =>
                                      filteredHistoryAccess.doctor_id === user.id
                              )
                        : historyAccesses.filter(historyAccess => historyAccess.case_id === caseId);

                const casesWaitingApproval = allAccessRequests.filter(
                    accessCase => accessCase.status === "Waiting approval"
                );
                if (casesWaitingApproval.length > 0) {
                    requestStatus = "Waiting approval";
                    accessLevel =
                        casesWaitingApproval[casesWaitingApproval.length - 1].access_level;
                    waitingApproval = true;
                    waitingLevel =
                        casesWaitingApproval[casesWaitingApproval.length - 1].access_level;
                    historyAccessId = casesWaitingApproval[casesWaitingApproval.length - 1].id;
                } else if (
                    allAccessRequests.filter(
                        accessCase =>
                            accessCase.status === "Approved" && accessCase.access_level === "All"
                    ).length > 0
                ) {
                    requestStatus = "Approved";
                    accessLevel = "All";
                } else {
                    if (
                        allAccessRequests.filter(
                            accessCase =>
                                accessCase.status === "Declined" &&
                                accessCase.access_level === "All"
                        ).length > 0
                    ) {
                        requestStatus = "Declined";
                        accessLevel = "All";
                        // allDeclined = true
                    }

                    if (
                        allAccessRequests.filter(
                            accessCase =>
                                accessCase.status === "Approved" &&
                                accessCase.access_level === "Speciality"
                        ).length > 0
                    ) {
                        requestStatus = "Approved";
                        accessLevel = "Speciality";
                    } else if (
                        allAccessRequests.filter(
                            accessCase =>
                                accessCase.status === "Declined" &&
                                accessCase.access_level === "Speciality"
                        ).length > 0
                    ) {
                        requestStatus = "Declined";
                        accessLevel = "Speciality";
                    }
                }
            }

            dispatch(
                getRequestStatus(
                    allAccessRequests,
                    requestStatus,
                    accessLevel,
                    historyAccessId,
                    waitingApproval,
                    waitingLevel
                    // allDeclined,
                    // specialityDeclined
                )
            );
            // if (user.type === "doctor") {
            //     dispatch(getHistoryCases(patientId, accessLevel, specialityId);
            // }

            dispatch(historyAccessActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(historyAccessActionError());
        }
    };
};

export const approveHistoryAccess = (historyAccessId: number, accessLevel: string) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(historyAccessActionStart());

            await axios.post(`patient/patient_history_access/approve/${historyAccessId}`, {
                access_level: accessLevel
            });

            dispatch(historyAccessActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(historyAccessActionError());
        }
    };
};

export const declineHistoryAccess = (historyAccessId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(historyAccessActionStart());

            await axios.post(`patient/patient_history_access/decline/${historyAccessId}`);

            dispatch(historyAccessActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(historyAccessActionError());
        }
    };
};
