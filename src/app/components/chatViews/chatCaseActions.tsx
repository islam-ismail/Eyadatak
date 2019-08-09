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
import {
    CHAT_CASE_ACTION_ERROR,
    CHAT_CASE_ACTION_FINISH,
    CHAT_CASE_ACTION_START,
    GET_CASE_DOCTOR,
    GET_CASE_PATIENT,
    GET_CASE_REPLIES
} from "./chatCaseConstants";
import {
    CaseChatElement,
    GetCaseChatDataAction,
    GetCaseDoctorAction,
    GetCasePatientAction
} from "./chatCaseTypes";
import {
    approveHistoryAccess,
    declineHistoryAccess,
    getAccessRequestStatus
} from "./historyAccess/historyAccessActions";
import { Dispatch } from "redux";
import { MedicalCase } from "../../types/models/MedicalCase";

export const chatCaseActionStart = (): AppAction => {
    return {
        type: CHAT_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const chatCaseActionFinish = (): AppAction => {
    return {
        type: CHAT_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const chatCaseActionError = (): AppAction => {
    return {
        type: CHAT_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getCaseChatData = (
    replies: CaseChatElement[],
    questions: CaseChatElement[] = [],
    lastReplyId: number = 0
): GetCaseChatDataAction => {
    return {
        type: GET_CASE_REPLIES,
        payload: { replies: replies, questions: questions, lastReplyId: lastReplyId }
    };
};

export const getCasePatient = (casePatient: User): GetCasePatientAction => {
    return {
        type: GET_CASE_PATIENT,
        payload: casePatient
    };
};

export const getCaseDoctor = (caseDoctor: Doctor): GetCaseDoctorAction => {
    return {
        type: GET_CASE_DOCTOR,
        payload: caseDoctor
    };
};

export const groupAnswersAndQuestions = (sortedReplies, groupWhat) => {
    const groupedReplies = [];
    let tempGroup = [];
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
                        let itemToPush =
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
                let itemToPush =
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
        let itemToPush =
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

export const getChatCaseReplies = (
    caseId: number,
    chatCase: MedicalCase,
    userType: string,
    clearFirst: boolean = false
) => {
    return (dispatch: Dispatch<AppAction>) => {
        if (userType === "doctor") {
            dispatch(getDoctorChatCaseReplies(caseId, chatCase, clearFirst));
        } else {
            dispatch(getPatientChatCaseReplies(caseId, chatCase, clearFirst));
        }
    };
};

export const getDoctorChatCaseReplies = (
    caseId: number,
    chatCase: MedicalCase,
    clearFirst: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());
            if (clearFirst) dispatch(getCaseChatData([]));

            const response1 = await axios.get(`case_replies/medical_case/${caseId}`);
            const data1 = response1.data;
            const caseReplies: CaseReply[] = data1.data.case_replies;
            const lastReplyId =
                caseReplies.length !== 0
                    ? Math.max.apply(Math, caseReplies.map(reply => reply.id))
                    : 0;

            const response2 = await axios.get(`case_questions/medical_case/${caseId}/answers`);
            const data2 = response2.data;
            const caseAnswers: CaseQuestionAnswer[] = data2.data.answers;

            const response3 = await axios.get(`case_questions/medical_case/${caseId}/unanswered`);
            const data3 = response3.data;
            const caseUnansweredQuestions: CaseQuestion[] = data3.data.case_questions;

            const response4 = await axios.get(`case_transfers/${caseId}`);
            const data4 = response4.data;
            const caseTransfers: CaseTransfer[] = data4.data.case_transfers;

            const caseChatData: CaseChatElement[] = [];
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
            if (sortedReplies.length === 0) {
                dispatch(getCaseChatData([]));
            } else {
                const answersGrouped = groupAnswersAndQuestions(sortedReplies, "answer");
                const groupedQuestions = answersGrouped.filter(reply => reply.type === "question");
                const answersAndQuestionsGrouped = groupAnswersAndQuestions(
                    answersGrouped,
                    "question"
                );
                dispatch(
                    getCaseChatData(answersAndQuestionsGrouped, groupedQuestions, lastReplyId)
                );
            }

            if (chatCase.patient) {
                dispatch(getCasePatient(chatCase.patient));
            }

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const getPatientChatCaseReplies = (
    caseId: number,
    chatCase: MedicalCase,
    clearFirst: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());
            if (clearFirst) dispatch(getCaseChatData([]));

            const response1 = await axios.get(`case_replies/medical_case/${caseId}`);
            const data1 = response1.data;
            const caseReplies: CaseReply[] = data1.data.case_replies;

            const lastReplyId =
                caseReplies.length !== 0
                    ? Math.max.apply(Math, caseReplies.map(reply => reply.id))
                    : 0;

            const response2 = await axios.get(`case_questions/medical_case/${caseId}/answers`);
            const data2 = response2.data;
            const caseAnswers: CaseQuestionAnswer[] = data2.data.answers;

            const response3 = await axios.get(`case_questions/medical_case/${caseId}/unanswered`);
            const data3 = response3.data;
            const caseUnansweredQuestions: CaseQuestion[] = data3.data.case_questions;

            const response4 = await axios.get(`case_transfers/${caseId}`);
            const data4 = response4.data;
            const caseTransfers: CaseTransfer[] = data4.data.case_transfers;

            let chatCaseDoctor: Doctor | null = null;
            if (chatCase.doctor_id !== 0) {
                if (chatCase.doctor) {
                    const response5 = await axios.get(`doctors/${chatCase.doctor.id}`);
                    const data5 = response5.data;
                    chatCaseDoctor = data5.data.doctor;
                }
            }

            const caseChatData = [];
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
            if (sortedReplies.length === 0) dispatch(getCaseChatData([]));
            else {
                const answersGrouped = groupAnswersAndQuestions(sortedReplies, "answer");
                const groupedQuestions = answersGrouped.filter(reply => reply.type === "question");
                const answersAndQuestionsGrouped = groupAnswersAndQuestions(
                    answersGrouped,
                    "question"
                );
                dispatch(
                    getCaseChatData(answersAndQuestionsGrouped, groupedQuestions, lastReplyId)
                );
            }

            if (chatCaseDoctor) {
                dispatch(getCaseDoctor(chatCaseDoctor));
            }

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const handleSubmitChatReply = (
    chatCase: MedicalCase,
    case_reply: CaseReply,
    userType: string
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());

            await axios.post(`case_replies/${case_reply.case_id}`, { reply: case_reply.reply });
            dispatch(getChatCaseReplies(chatCase.id, chatCase, userType, true));

            dispatch(chatCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(chatCaseActionError());
        }
    };
};

export const handleUploadFiles = (caseId: number, uploadedFiles) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());

            await Promise.all(
                uploadedFiles.map(async (file, index) => {
                    console.log("file:", file[0]);
                    const formData = new FormData();
                    formData.append("question_answer", file[0]);
                    console.log("formData:", formData);
                    await axios
                        .create({
                            headers: { "Content-Type": "multipart/form-data" }
                        })
                        .post(`patient/case_questions/${caseId}/${index}`, formData)
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

export const handleSubmitAnswers = (
    caseId: number,
    answers: any[],
    caseQuestions: CaseQuestion[]
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(chatCaseActionStart());

            await Promise.all(
                answers.map(async (answer, index) => {
                    const answeredQuestion = caseQuestions.filter(
                        caseQuestion => caseQuestion.id === index
                    );

                    if (answeredQuestion[0].question_template.question_type === "CheckboxInput")
                        await axios.post(`patient/case_questions/${caseId}/${index}`, {
                            question_answer: JSON.stringify(answer)
                        });
                    else
                        await axios.post(`patient/case_questions/${caseId}/${index}`, {
                            question_answer: answer
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

export const getHistoryAccessRequestStatus = (
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        dispatch(getAccessRequestStatus(caseId, user, patientId, specialityId, true));
    };
};

export const respondToHistoryAccessRequest = (
    historyAccessId: number,
    requestStatus: string,
    accessLevel: string,
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        if (requestStatus === "Approved")
            await dispatch(approveHistoryAccess(historyAccessId, accessLevel));
        else await dispatch(declineHistoryAccess(historyAccessId));
        // dispatch(getChatCaseReplies(chatCase.id, chatCase, userType, true))
        setTimeout(
            () => dispatch(getAccessRequestStatus(caseId, user, patientId, specialityId, true)),
            3000
        );
    };
};

export const deleteTransferRequest = (transferCase: MedicalCase, transferId: number) => {
    return async (dispatch: Dispatch<AppAction>) => {
        dispatch(deleteTransfer(transferCase, transferId));
    };
};
