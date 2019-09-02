import {
    SET_CASE_REPLIES,
    SET_CASE_DOCTOR,
    SET_CASE_PATIENT,
    CHAT_CASE_ACTION_START,
    CHAT_CASE_ACTION_FINISH,
    CHAT_CASE_ACTION_ERROR
} from "./chatCaseConstants";
import { AppAction } from "../../types/app-action";
import { CaseReply } from "../../types/models/CaseReply";
import { CaseQuestion } from "../../types/models/CaseQuestion";
import { User } from "../../types/models/User";
import { Doctor } from "../../types/models/Doctor";
import { CaseQuestionAnswer } from "../../types/models/CaseQuestionAnswer";
import { CaseTransfer } from "../../types/models/CaseTransfer";
import { MedicalCase } from "../../types/models/MedicalCase";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { PatientHistoryAccess } from "../../types/models/PatientHistoryAccess";

export interface CaseChatElement {
    id: number;
    type:
        | "originalQuestion"
        | "reply"
        | "answer"
        | "question"
        | "transfer"
        | "questionGroup"
        | "answerGroup"
        | "Closed"
        | "accessRequest";
    created_at: string;
    reply?: CaseReply;
    question?: MedicalCase | CaseQuestion;
    answer?: CaseQuestionAnswer;
    transfer?: CaseTransfer;
    questionGroup?: CaseChatElement[];
    answerGroup?: CaseChatElement[];
    accessRequest?: PatientHistoryAccess;
}

/** actions definitions */
export interface ChatCaseActionStartAction extends AppAction {
    type: typeof CHAT_CASE_ACTION_START;
    excludeRefresh: boolean;
}

export interface ChatCaseActionFinishAction extends AppAction {
    type: typeof CHAT_CASE_ACTION_FINISH;
    excludeRefresh: boolean;
}

export interface ChatCaseActionErrorAction extends AppAction {
    type: typeof CHAT_CASE_ACTION_ERROR;
    excludeRefresh: boolean;
}

export interface SetCaseChatDataAction extends AppAction {
    type: typeof SET_CASE_REPLIES;
    payload: {
        replies: CaseChatElement[];
        questions: CaseChatElement[];
        lastReplyId: number;
    };
}

export interface SetCasePatientAction extends AppAction {
    type: typeof SET_CASE_PATIENT;
    payload: User;
}

export interface SetCaseDoctorAction extends AppAction {
    type: typeof SET_CASE_DOCTOR;
    payload: Doctor;
}

export type ChatCaseActions = ChatCaseActionStartAction &
    ChatCaseActionFinishAction &
    ChatCaseActionErrorAction &
    SetCaseChatDataAction &
    SetCasePatientAction &
    SetCaseDoctorAction;

/** action creators signature */
export type groupAnswersAndQuestionsSig = (
    sortedReplies: CaseChatElement[],
    groupWhat: string
) => CaseChatElement[];

export type setChatCaseRepliesSig = (
    chatCase: MedicalCase,
    userType: "doctor" | "patient",
    clearFirst?: boolean
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => void;

export type setDoctorChatCaseRepliesSig = (
    chatCase: MedicalCase,
    clearFirst: boolean
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type setPatientChatCaseRepliesSig = (
    chatCase: MedicalCase,
    clearFirst: boolean
) => (dispatch: Dispatch<AppAction>) => Promise<void>;

export type handleSubmitChatReplySig = (
    chatCase: MedicalCase,
    case_reply: { case_id: number; reply: string },
    userType: "doctor" | "patient"
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type handleUploadFilesSig = (
    chatCase: MedicalCase,
    uploadedFiles: File[][]
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type handleSubmitAnswersSig = (
    chatCase: MedicalCase,
    answers: any[],
    caseQuestions: CaseChatElement[]
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type setHistoryAccessRequestStatusSig = (
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type respondToHistoryAccessRequestSig = (
    historyAccessId: number,
    requestStatus: string,
    accessLevel: string,
    caseId: number,
    user: User,
    patientId: number,
    specialityId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export type deleteTransferRequestSig = (
    transferCase: MedicalCase,
    transferId: number
) => (dispatch: ThunkDispatch<{}, {}, AppAction>) => Promise<void>;

export interface ChatCaseSignatures {
    groupAnswersAndQuestions: groupAnswersAndQuestionsSig;
    setChatCaseReplies: (
        chatCase: MedicalCase,
        userType: "doctor" | "patient",
        clearFirst?: boolean
    ) => void;
    setDoctorChatCaseReplies: (chatCase: MedicalCase, clearFirst: boolean) => Promise<void>;
    setPatientChatCaseReplies: (chatCase: MedicalCase, clearFirst: boolean) => Promise<void>;
    handleSubmitChatReply: (
        chatCase: MedicalCase,
        case_reply: { case_id: number; reply: string },
        userType: "doctor" | "patient"
    ) => Promise<void>;
    handleUploadFiles: (chatCase: MedicalCase, uploadedFiles: File[][]) => Promise<void>;
    handleSubmitAnswers: (
        chatCase: MedicalCase,
        answers: any[],
        caseQuestions: CaseChatElement[]
    ) => Promise<void>;
    setHistoryAccessRequestStatus: (
        caseId: number,
        user: User,
        patientId: number,
        specialityId: number
    ) => Promise<void>;
    respondToHistoryAccessRequest: (
        historyAccessId: number,
        requestStatus: string,
        accessLevel: string,
        caseId: number,
        user: User,
        patientId: number,
        specialityId: number
    ) => Promise<void>;
    deleteTransferRequest: (transferCase: MedicalCase, transferId: number) => Promise<void>;
}
