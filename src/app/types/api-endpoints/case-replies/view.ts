import { ApiResponse } from "../../api-response";
import { CaseReply } from "../../models/CaseReply";

export const Api_CaseRepliesView_Endpoint = (case_reply_id: number) =>
    `case_replies/${case_reply_id}`;

export const Api_CaseRepliesView_HttpMethod = "GET";

export interface Api_CaseRepliesView_Response extends ApiResponse {
    data?: {
        case_reply: CaseReply;
    };
}
