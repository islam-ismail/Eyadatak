import axios from "axios";
import { toast } from "react-toastify";
import {
    HISTORY_CASE_ACTION_START,
    HISTORY_CASE_ACTION_FINISH,
    HISTORY_CASE_ACTION_ERROR,
    GET_HISTORY_CASE_REPLIES
} from "./historyCaseConstants";
import { groupAnswersAndQuestions } from "../chatCaseActions";
import { AppAction } from "../../../types/app-action";
import { CaseReply } from "../../../types/models/CaseReply";
import { GetHistoryCaseChatDataAction } from "./historyCaseTypes";
import { CaseChatElement } from "../chatCaseTypes";
import { Dispatch } from "redux";
import { MedicalCase } from "../../../types/models/MedicalCase";
import { CaseQuestionAnswer } from "../../../types/models/CaseQuestionAnswer";
import { CaseTransfer } from "../../../types/models/CaseTransfer";

export const historyCaseActionStart = (): AppAction => {
    return {
        type: HISTORY_CASE_ACTION_START,
        excludeRefresh: true
    };
};

export const historyCaseActionFinish = (): AppAction => {
    return {
        type: HISTORY_CASE_ACTION_FINISH,
        excludeRefresh: true
    };
};

export const historyCaseActionError = (): AppAction => {
    return {
        type: HISTORY_CASE_ACTION_ERROR,
        excludeRefresh: true
    };
};

export const getHistoryCaseChatData = (
    replies: CaseChatElement[]
): GetHistoryCaseChatDataAction => {
    return {
        type: GET_HISTORY_CASE_REPLIES,
        payload: replies
    };
};

export const getHistoryCaseReplies = (
    caseId: number,
    chatCase: MedicalCase,
    clearFirst: boolean
) => {
    return async (dispatch: Dispatch<AppAction>) => {
        try {
            dispatch(historyCaseActionStart());
            if (clearFirst) dispatch(getHistoryCaseChatData([]));

            const response1 = await axios.get(`case_replies/medical_case/${caseId}`);
            const data1 = response1.data;
            const caseReplies = data1.data.case_replies;

            const response2 = await axios.get(`case_questions/medical_case/${caseId}/answers`);
            const data2 = response2.data;
            const caseAnswers = data2.data.answers;

            // const response3 = await axios.get(`case_questions/medical_case/${caseId}/unanswered`)
            // const data3 = response3.data
            // const caseUnansweredQuestions = data3.data.case_questions

            const response4 = await axios.get(`case_transfers/${caseId}`);
            const data4 = response4.data;
            const caseTransfers = data4.data.case_transfers;

            const caseChatData = [];
            let index = 0;

            caseChatData.push({
                id: index++,
                type: "originalQuestion",
                created_at: chatCase.created_at,
                question: chatCase
            });

            await Promise.all(
                caseReplies.map(async (caseReply: CaseReply) => {
                    caseChatData.push({
                        id: index++,
                        type: "reply",
                        created_at: caseReply.created_at,
                        reply: caseReply
                    });
                })
            );

            await Promise.all(
                caseAnswers.map(async (caseAnswer: CaseQuestionAnswer) => {
                    caseChatData.push({
                        id: index++,
                        type: "answer",
                        created_at: caseAnswer.created_at,
                        answer: caseAnswer
                    });
                })
            );

            // await Promise.all(caseUnansweredQuestions.map(async caseQuestion => {
            //   caseChatData.push({
            //     id: index++,
            //     type: 'question',
            //     created_at: caseQuestion.created_at,
            //     question: caseQuestion
            //   })
            // }))

            await Promise.all(
                caseTransfers.map(async (caseTransfer: CaseTransfer) => {
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
                dispatch(getHistoryCaseChatData([]));
            } else {
                // const answersGrouped = groupAnswersAndQuestions(sortedReplies, 'answer')
                // const answersAndQuestionsGrouped = groupAnswersAndQuestions(answersGrouped, 'question')
                // dispatch(getHistoryCaseChatData(answersAndQuestionsGrouped))
                const answersGrouped = groupAnswersAndQuestions(sortedReplies, "answer");
                dispatch(getHistoryCaseChatData(answersGrouped));
            }

            dispatch(historyCaseActionFinish());
        } catch (error) {
            console.log("error:", error);
            toast.error(error.response.data.error_message);
            dispatch(historyCaseActionError());
        }
    };
};
