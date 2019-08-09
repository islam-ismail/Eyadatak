import { GET_CASE_REPLIES, GET_CASE_DOCTOR, GET_CASE_PATIENT } from "./chatCaseConstants";
import { AppAction } from "../../types/app-action";
import { CaseReply } from "../../types/models/CaseReply";
import { CaseQuestion } from "../../types/models/CaseQuestion";
import { User } from "../../types/models/User";
import { Doctor } from "../../types/models/Doctor";
import { CaseQuestionAnswer } from "../../types/models/CaseQuestionAnswer";
import { CaseTransfer } from "../../types/models/CaseTransfer";
import { MedicalCase } from "../../types/models/MedicalCase";

export interface CaseChatElement {
    id: number;
    type: "originalQuestion" | "reply" | "answer" | "question" | "transfer";
    created_at: string;
    reply?: CaseReply;
    question?: MedicalCase | CaseQuestion;
    answer?: CaseQuestionAnswer;
    transfer?: CaseTransfer;
}

export interface GetCaseChatDataAction extends AppAction {
    type: typeof GET_CASE_REPLIES;
    payload: {
        replies: CaseChatElement[];
        questions: CaseChatElement[];
        lastReplyId: number;
    };
}

export interface GetCasePatientAction extends AppAction {
    type: typeof GET_CASE_PATIENT;
    payload: User;
}

export interface GetCaseDoctorAction extends AppAction {
    type: typeof GET_CASE_DOCTOR;
    payload: Doctor;
}
