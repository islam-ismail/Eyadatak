import axios from "axios";
import { toast } from "react-toastify";
import * as historyCaseConstants from "./historyCaseConstants";
import { groupAnswersAndQuestions } from "../chatCaseActions";
import { AppAction } from "../../../types/app-action";
import { CaseReply } from "../../../types/models/CaseReply";
import * as historyCaseTypes from "./historyCaseTypes";
import { CaseChatElement } from "../chatCaseTypes";
import { Dispatch } from "redux";
import { MedicalCase } from "../../../types/models/MedicalCase";
import { CaseQuestionAnswer } from "../../../types/models/CaseQuestionAnswer";
import { CaseTransfer } from "../../../types/models/CaseTransfer";
import {
    Api_CaseRepliesViewAll_Endpoint,
    Api_CaseRepliesViewAll_Response
} from "../../../types/api-endpoints/case-replies";
import {
    Api_CaseQuestionsViewAnswers_Endpoint,
    Api_CaseQuestionsViewAnswers_Response
} from "../../../types/api-endpoints/case_questions";
import {
    Api_CaseTransfersViewMedicalCase_Endpoint,
    Api_CaseTransfersViewMedicalCase_Response
} from "../../../types/api-endpoints/case-transfers";

export const historyCaseActionStart = (): historyCaseTypes.HistoryCaseActionStartAction => {
    return {
        type: historyCaseConstants.HISTORY_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const historyCaseActionFinish = (): historyCaseTypes.HistoryCaseActionFinishAction => {
    return {
        type: historyCaseConstants.HISTORY_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const historyCaseActionError = (): historyCaseTypes.HistoryCaseActionErrorAction => {
    return {
        type: historyCaseConstants.HISTORY_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const setHistoryCaseChatData = (
    replies: CaseChatElement[]
): historyCaseTypes.SetHistoryCaseChatDataAction => {
    return {
        type: historyCaseConstants.SET_HISTORY_CASE_REPLIES,
        payload: replies
    };
};

export const setHistoryCaseReplies: historyCaseTypes.setHistoryCaseRepliesSig = (
    caseId: number,
    chatCase: MedicalCase,
    clearFirst: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(historyCaseActionStart());
            if (clearFirst) dispatch(setHistoryCaseChatData([]));

            let caseReplies: CaseReply[] = [];
            const response1 = await axios.get(Api_CaseRepliesViewAll_Endpoint(caseId));
            const responseData1: Api_CaseRepliesViewAll_Response = response1.data;
            if (responseData1.data) {
                caseReplies = responseData1.data.case_replies;
            }

            let caseAnswers: CaseQuestionAnswer[] = [];
            const response2 = await axios.get(Api_CaseQuestionsViewAnswers_Endpoint(caseId));
            const responseData2: Api_CaseQuestionsViewAnswers_Response = response2.data;
            if (responseData2.data) {
                caseAnswers = responseData2.data.answers;
            }

            // const response3 = await axios.get(`case_questions/medical_case/${caseId}/unanswered`)
            // const responseData3 = response3.data
            // const caseUnansweredQuestions = responseData3.data.case_questions

            let caseTransfers: CaseTransfer[] = [];
            const response4 = await axios.get(Api_CaseTransfersViewMedicalCase_Endpoint(caseId));
            const responseData4: Api_CaseTransfersViewMedicalCase_Response = response4.data;
            if (responseData4.data) {
                caseTransfers = responseData4.data.case_transfers;
            }

            const caseChatData: CaseChatElement[] = [];
            let index = 0;

            caseChatData.push({
                id: index++,
                type: "originalQuestion",
                created_at: chatCase.created_at,
                question: chatCase
            });

            caseReplies.forEach((caseReply: CaseReply) => {
                caseChatData.push({
                    id: index++,
                    type: "reply",
                    created_at: caseReply.created_at,
                    reply: caseReply
                });
            });

            caseAnswers.forEach((caseAnswer: CaseQuestionAnswer) => {
                caseChatData.push({
                    id: index++,
                    type: "answer",
                    created_at: caseAnswer.created_at,
                    answer: caseAnswer
                });
            });

            // caseUnansweredQuestions.forEach(caseQuestion => {
            //     caseChatData.push({
            //         id: index++,
            //         type: "question",
            //         created_at: caseQuestion.created_at,
            //         question: caseQuestion
            //     });
            // });

            caseTransfers.forEach((caseTransfer: CaseTransfer) => {
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
                dispatch(setHistoryCaseChatData([]));
            } else {
                // const answersGrouped = groupAnswersAndQuestions(sortedReplies, 'answer')
                // const answersAndQuestionsGrouped = groupAnswersAndQuestions(answersGrouped, 'question')
                // dispatch(setHistoryCaseChatData(answersAndQuestionsGrouped))
                const answersGrouped = groupAnswersAndQuestions(sortedReplies, "answer");
                dispatch(setHistoryCaseChatData(answersGrouped));
            }

            dispatch(historyCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            if (error.response && error.response.data.error_message) {
                toast.error(error.response.data.error_message);
            }
            dispatch(historyCaseActionError());
        }
    };
};
