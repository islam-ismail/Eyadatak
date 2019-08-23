import axios from "axios";
import { toast } from "react-toastify";
import { AppAction } from "../../types/app-action";
import { CaseQuestion } from "../../types/models/CaseQuestion";
import { CaseQuestionAnswer } from "../../types/models/CaseQuestionAnswer";
import { CaseReply } from "../../types/models/CaseReply";
import { CaseTransfer } from "../../types/models/CaseTransfer";
import { Doctor } from "../../types/models/Doctor";
import { User } from "../../types/models/User";
import { deleteTransfer } from "../transferCase/transferCaseActions";
import * as chatCaseConstants from "./chatCaseConstants";
import * as chatCaseTypes from "./chatCaseTypes";
import * as historyAccessActions from "./historyAccess/historyAccessActions";
import { Dispatch } from "redux";
import { MedicalCase } from "../../types/models/MedicalCase";
import { ThunkDispatch } from "redux-thunk";
import {
    Api_CaseRepliesViewAll_Endpoint,
    Api_CaseRepliesViewAll_Response,
    Api_CaseRepliesAdd_Endpoint,
    Api_CaseRepliesAdd_Payload
} from "../../types/api-endpoints/case-replies";
import {
    Api_CaseQuestionsViewAnswers_Endpoint,
    Api_CaseQuestionsViewAnswers_Response,
    Api_CaseQuestionsViewUnanswered_Endpoint,
    Api_CaseQuestionsViewUnanswered_Response
} from "../../types/api-endpoints/case_questions";
import {
    Api_CaseTransfersViewMedicalCase_Endpoint,
    Api_CaseTransfersViewMedicalCase_Response
} from "../../types/api-endpoints/case-transfers";
import {
    Api_PatientCaseQuestionsAnswer_Endpoint,
    Api_PatientCaseQuestionsAnswer_Payload
} from "../../types/api-endpoints/patient";
import {
    Api_DoctorsView_Endpoint,
    Api_DoctorsView_Response
} from "../../types/api-endpoints/doctors";

export const chatCaseActionStart = (): chatCaseTypes.ChatCaseActionStartAction => {
    return {
        type: chatCaseConstants.CHAT_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const chatCaseActionFinish = (): chatCaseTypes.ChatCaseActionFinishAction => {
    return {
        type: chatCaseConstants.CHAT_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const chatCaseActionError = (): chatCaseTypes.ChatCaseActionErrorAction => {
    return {
        type: chatCaseConstants.CHAT_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const setCaseChatData = (
    replies: chatCaseTypes.CaseChatElement[],
    questions: chatCaseTypes.CaseChatElement[] = [],
    lastReplyId: number = 0
): chatCaseTypes.SetCaseChatDataAction => {
    return {
        type: chatCaseConstants.SET_CASE_REPLIES,
        payload: { replies: replies, questions: questions, lastReplyId: lastReplyId }
    };
};

export const setCasePatient = (casePatient: User): chatCaseTypes.SetCasePatientAction => {
    return {
        type: chatCaseConstants.SET_CASE_PATIENT,
        payload: casePatient
    };
};

export const setCaseDoctor = (caseDoctor: Doctor): chatCaseTypes.SetCaseDoctorAction => {
    return {
        type: chatCaseConstants.SET_CASE_DOCTOR,
        payload: caseDoctor
    };
};

export const groupAnswersAndQuestions: chatCaseTypes.groupAnswersAndQuestionsSig = (
    sortedReplies: chatCaseTypes.CaseChatElement[],
    groupWhat: string
): chatCaseTypes.CaseChatElement[] => {
    const groupedReplies: chatCaseTypes.CaseChatElement[] = [];
    let tempGroup: chatCaseTypes.CaseChatElement[] = [];
    let timeDiff = 0;

    if (sortedReplies[0].type === groupWhat) tempGroup.push(sortedReplies[0]);
    else groupedReplies.push(sortedReplies[0]);

    let i = 1;
    for (i; i < sortedReplies.length; i++) {
        if (sortedReplies[i].type === groupWhat) {
            if (tempGroup.length === 0) {
                tempGroup.push(sortedReplies[i]);
            } else {
                timeDiff =
                    Date.parse(tempGroup[0].created_at) - Date.parse(sortedReplies[i].created_at);
                if (timeDiff <= 60000 && timeDiff >= -60000) {
                    tempGroup.push(sortedReplies[i]);
                } else {
                    if (tempGroup.length === 1) {
                        groupedReplies.push(tempGroup[0]);
                    } else {
                        let itemToPush: chatCaseTypes.CaseChatElement =
                            groupWhat === "answer"
                                ? {
                                      id: tempGroup[0].id,
                                      type: "answerGroup",
                                      created_at: tempGroup[0].created_at,
                                      answerGroup: tempGroup
                                  }
                                : {
                                      id: tempGroup[0].id,
                                      type: "questionGroup",
                                      created_at: tempGroup[0].created_at,
                                      questionGroup: tempGroup
                                  };
                        groupedReplies.push(itemToPush);
                    }
                    tempGroup = [];
                    tempGroup.push(sortedReplies[i]);
                }
            }
        } else {
            if (tempGroup.length > 1) {
                let itemToPush: chatCaseTypes.CaseChatElement =
                    groupWhat === "answer"
                        ? {
                              id: tempGroup[0].id,
                              type: "answerGroup",
                              created_at: tempGroup[0].created_at,
                              answerGroup: tempGroup
                          }
                        : {
                              id: tempGroup[0].id,
                              type: "questionGroup",
                              created_at: tempGroup[0].created_at,
                              questionGroup: tempGroup
                          };
                groupedReplies.push(itemToPush);
                tempGroup = [];
                groupedReplies.push(sortedReplies[i]);
            } else if (tempGroup.length === 1) {
                groupedReplies.push(tempGroup[0]);
                tempGroup = [];
                groupedReplies.push(sortedReplies[i]);
            } else {
                groupedReplies.push(sortedReplies[i]);
            }
        }
    }
    // Checking if there are items inside tempGroup after exiting the loop
    if (tempGroup.length > 1) {
        let itemToPush: chatCaseTypes.CaseChatElement =
            groupWhat === "answer"
                ? {
                      id: tempGroup[0].id,
                      type: "answerGroup",
                      created_at: tempGroup[0].created_at,
                      answerGroup: tempGroup
                  }
                : {
                      id: tempGroup[0].id,
                      type: "questionGroup",
                      created_at: tempGroup[0].created_at,
                      questionGroup: tempGroup
                  };
        groupedReplies.push(itemToPush);
        tempGroup = [];
    } else if (tempGroup.length === 1) {
        groupedReplies.push(tempGroup[0]);
        tempGroup = [];
    }

    return groupedReplies;
};

export const setChatCaseReplies: chatCaseTypes.setChatCaseRepliesSig = (
    caseId: number,
    chatCase: MedicalCase,
    userType: string,
    clearFirst: boolean = false
) => {
    return (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        if (userType === "doctor") {
            dispatch(setDoctorChatCaseReplies(caseId, chatCase, clearFirst));
        } else {
            dispatch(setPatientChatCaseReplies(caseId, chatCase, clearFirst));
        }
    };
};

export const setDoctorChatCaseReplies: chatCaseTypes.setDoctorChatCaseRepliesSig = (
    caseId: number,
    chatCase: MedicalCase,
    clearFirst: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());
            if (clearFirst) dispatch(setCaseChatData([]));

            const response1 = await axios.get(Api_CaseRepliesViewAll_Endpoint(caseId));
            const responseData1: Api_CaseRepliesViewAll_Response = response1.data;
            let caseReplies: CaseReply[] = [];
            if (responseData1.data) {
                caseReplies = responseData1.data.case_replies;
            }
            const lastReplyId =
                caseReplies.length !== 0
                    ? Math.max.apply(Math, caseReplies.map(reply => reply.id))
                    : 0;

            const response2 = await axios.get(Api_CaseQuestionsViewAnswers_Endpoint(caseId));
            const responseData2: Api_CaseQuestionsViewAnswers_Response = response2.data;
            let caseAnswers: CaseQuestionAnswer[] = [];
            if (responseData2.data) {
                caseAnswers = responseData2.data.answers;
            }

            const response3 = await axios.get(Api_CaseQuestionsViewUnanswered_Endpoint(caseId));
            const responseData3: Api_CaseQuestionsViewUnanswered_Response = response3.data;
            let caseUnansweredQuestions: CaseQuestion[] = [];
            if (responseData3.data) {
                caseUnansweredQuestions = responseData3.data.case_questions;
            }

            const response4 = await axios.get(Api_CaseTransfersViewMedicalCase_Endpoint(caseId));
            const responseData4: Api_CaseTransfersViewMedicalCase_Response = response4.data;
            let caseTransfers: CaseTransfer[] = [];
            if (responseData4.data) {
                caseTransfers = responseData4.data.case_transfers;
            }

            const caseChatData: chatCaseTypes.CaseChatElement[] = [];
            let index = 0;

            caseChatData.push({
                id: index++,
                type: "originalQuestion",
                created_at: chatCase.created_at,
                question: chatCase
            });

            caseReplies.forEach(caseReply => {
                caseChatData.push({
                    id: index++,
                    type: "reply",
                    created_at: caseReply.created_at,
                    reply: caseReply
                });
            });

            caseAnswers.forEach(caseAnswer => {
                caseChatData.push({
                    id: index++,
                    type: "answer",
                    created_at: caseAnswer.created_at,
                    answer: caseAnswer
                });
            });

            caseUnansweredQuestions.forEach(caseQuestion => {
                caseChatData.push({
                    id: index++,
                    type: "question",
                    created_at: caseQuestion.created_at,
                    question: caseQuestion
                });
            });

            caseTransfers.forEach(caseTransfer => {
                caseChatData.push({
                    id: index++,
                    type: "transfer",
                    created_at: caseTransfer.created_at,
                    transfer: caseTransfer
                });
            });

            const sortedReplies = caseChatData.sort(
                (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
            if (sortedReplies.length === 0) {
                dispatch(setCaseChatData([]));
            } else {
                const answersGrouped = groupAnswersAndQuestions(sortedReplies, "answer");
                const groupedQuestions = answersGrouped.filter(reply => reply.type === "question");
                const answersAndQuestionsGrouped = groupAnswersAndQuestions(
                    answersGrouped,
                    "question"
                );
                dispatch(
                    setCaseChatData(answersAndQuestionsGrouped, groupedQuestions, lastReplyId)
                );
            }

            if (chatCase.patient) {
                dispatch(setCasePatient(chatCase.patient));
            }

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const setPatientChatCaseReplies: chatCaseTypes.setPatientChatCaseRepliesSig = (
    caseId: number,
    chatCase: MedicalCase,
    clearFirst: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());
            if (clearFirst) dispatch(setCaseChatData([]));

            const response1 = await axios.get(Api_CaseRepliesViewAll_Endpoint(caseId));
            const responseData1: Api_CaseRepliesViewAll_Response = response1.data;
            let caseReplies: CaseReply[] = [];
            if (responseData1.data) {
                caseReplies = responseData1.data.case_replies;
            }

            const lastReplyId =
                caseReplies.length !== 0
                    ? Math.max.apply(Math, caseReplies.map(reply => reply.id))
                    : 0;

            const response2 = await axios.get(Api_CaseQuestionsViewAnswers_Endpoint(caseId));
            const responseData2: Api_CaseQuestionsViewAnswers_Response = response2.data;
            let caseAnswers: CaseQuestionAnswer[] = [];
            if (responseData2.data) {
                caseAnswers = responseData2.data.answers;
            }

            const response3 = await axios.get(Api_CaseQuestionsViewUnanswered_Endpoint(caseId));
            const responseData3: Api_CaseQuestionsViewUnanswered_Response = response3.data;
            let caseUnansweredQuestions: CaseQuestion[] = [];
            if (responseData3.data) {
                caseUnansweredQuestions = responseData3.data.case_questions;
            }

            const response4 = await axios.get(Api_CaseTransfersViewMedicalCase_Endpoint(caseId));
            const responseData4: Api_CaseTransfersViewMedicalCase_Response = response4.data;
            let caseTransfers: CaseTransfer[] = [];
            if (responseData4.data) {
                caseTransfers = responseData4.data.case_transfers;
            }

            let chatCaseDoctor: Doctor | null = null;
            if (chatCase.doctor_id !== 0) {
                if (chatCase.doctor) {
                    const response5 = await axios.get(Api_DoctorsView_Endpoint(chatCase.doctor.id));
                    const responseData5: Api_DoctorsView_Response = response5.data;
                    if (responseData5.data) {
                        chatCaseDoctor = responseData5.data.doctor;
                    }
                }
            }

            const caseChatData: chatCaseTypes.CaseChatElement[] = [];
            let index = 0;

            caseChatData.push({
                id: index++,
                type: "originalQuestion",
                created_at: chatCase.created_at,
                question: chatCase
            });

            await Promise.all(
                caseReplies.map(async caseReply => {
                    caseChatData.push({
                        id: index++,
                        type: "reply",
                        created_at: caseReply.created_at,
                        reply: caseReply
                    });
                })
            );

            await Promise.all(
                caseAnswers.map(async caseAnswer => {
                    caseChatData.push({
                        id: index++,
                        type: "answer",
                        created_at: caseAnswer.created_at,
                        answer: caseAnswer
                    });
                })
            );

            await Promise.all(
                caseUnansweredQuestions.map(async caseQuestion => {
                    caseChatData.push({
                        id: index++,
                        type: "question",
                        created_at: caseQuestion.created_at,
                        question: caseQuestion
                    });
                })
            );

            await Promise.all(
                caseTransfers.map(async caseTransfer => {
                    caseChatData.push({
                        id: index++,
                        type: "transfer",
                        created_at: caseTransfer.created_at,
                        transfer: caseTransfer
                    });
                })
            );

            const sortedReplies = caseChatData.sort(
                (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
            if (sortedReplies.length === 0) dispatch(setCaseChatData([]));
            else {
                const answersGrouped = groupAnswersAndQuestions(sortedReplies, "answer");
                const groupedQuestions = answersGrouped.filter(reply => reply.type === "question");
                const answersAndQuestionsGrouped = groupAnswersAndQuestions(
                    answersGrouped,
                    "question"
                );
                dispatch(
                    setCaseChatData(answersAndQuestionsGrouped, groupedQuestions, lastReplyId)
                );
            }

            if (chatCaseDoctor) {
                dispatch(setCaseDoctor(chatCaseDoctor));
            }

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const handleSubmitChatReply: chatCaseTypes.handleSubmitChatReplySig = (
    chatCase: MedicalCase,
    case_reply: { case_id: number; reply: string },
    userType: string
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        try {
            dispatch(chatCaseActionStart());

            const payload: Api_CaseRepliesAdd_Payload = {
                reply: case_reply.reply
            };
            await axios.post(Api_CaseRepliesAdd_Endpoint(case_reply.case_id), payload);

            dispatch(setChatCaseReplies(chatCase.id, chatCase, userType, true));

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const handleUploadFiles: chatCaseTypes.handleUploadFilesSig = (
    caseId: number,
    uploadedFiles: File[][]
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());

            await Promise.all(
                uploadedFiles.map(async (file, caseQuestionId: number) => {
                    console.log("file:", file[0]);
                    const formData = new FormData();
                    formData.append("question_answer", file[0]);
                    console.log("formData:", formData);
                    await axios
                        .create({
                            headers: { "Content-Type": "multipart/form-data" }
                        })
                        .post(
                            Api_PatientCaseQuestionsAnswer_Endpoint(caseId, caseQuestionId),
                            formData
                        )
                        .catch(function(error) {
                            console.log("catch error:", error);
                        });
                })
            );

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const handleSubmitAnswers: chatCaseTypes.handleSubmitAnswersSig = (
    caseId: number,
    answers: any[],
    caseQuestions: chatCaseTypes.CaseChatElement[]
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());

            await answers.forEach(async (answer, index) => {
                const answeredQuestion = caseQuestions.filter(
                    caseQuestion => caseQuestion.question && caseQuestion.question.id === index
                );

                let question_answer = "";
                if (answeredQuestion[0] && answeredQuestion[0].question) {
                    const question = answeredQuestion[0].question as CaseQuestion;
                    if (question.question_template.question_type === "CheckboxInput") {
                        question_answer = JSON.stringify(answer);
                    } else {
                        question_answer = answer;
                    }

                    let payload: Api_PatientCaseQuestionsAnswer_Payload = { question_answer };
                    await axios.post(
                        Api_PatientCaseQuestionsAnswer_Endpoint(caseId, index),
                        payload
                    );
                }
            });

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const setHistoryAccessRequestStatus: chatCaseTypes.setHistoryAccessRequestStatusSig = (
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        dispatch(
            historyAccessActions.setAccessRequestStatus(caseId, user, patientId, specialityId, true)
        );
    };
};

export const respondToHistoryAccessRequest: chatCaseTypes.respondToHistoryAccessRequestSig = (
    historyAccessId: number,
    requestStatus: string,
    accessLevel: string,
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        if (requestStatus === "Approved")
            await dispatch(historyAccessActions.approveHistoryAccess(historyAccessId, accessLevel));
        else await dispatch(historyAccessActions.declineHistoryAccess(historyAccessId));
        // dispatch(setChatCaseReplies(chatCase.id, chatCase, userType, true))
        setTimeout(
            () =>
                dispatch(
                    historyAccessActions.setAccessRequestStatus(
                        caseId,
                        user,
                        patientId,
                        specialityId,
                        true
                    )
                ),
            3000
        );
    };
};

export const deleteTransferRequest: chatCaseTypes.deleteTransferRequestSig = (
    transferCase: MedicalCase,
    transferId: number
) => {
    return async (dispatch: ThunkDispatch<{}, {}, AppAction>) => {
        dispatch(deleteTransfer(transferCase, transferId));
    };
};
