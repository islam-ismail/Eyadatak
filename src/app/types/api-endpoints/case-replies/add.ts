import { ApiResponse } from "../../api-response";
import { CaseReply } from "../../models/CaseReply";

export const Api_CaseRepliesAdd_Endpoint = (medical_case_id: number) =>
    `case_replies/${medical_case_id}`;

export const Api_CaseRepliesAdd_HttpMethod = "POST";

export interface Api_CaseRepliesAdd_Payload {
    reply: string;
}

export interface Api_CaseRepliesAdd_Response extends ApiResponse {
    data?: {
        case_reply: CaseReply;
    };
}
