import { ApiResponse } from "../../api-response";
import { CaseReply } from "../../models/CaseReply";

export const Api_CaseRepliesViewAll_Endpoint = (medical_case_id: number) =>
    `case_replies/medical_case/${medical_case_id}`;

export const Api_CaseRepliesViewAll_HttpMethod = "GET";

export interface Api_CaseRepliesViewAll_Response extends ApiResponse {
    data?: {
        case_replies: CaseReply[];
    };
}
