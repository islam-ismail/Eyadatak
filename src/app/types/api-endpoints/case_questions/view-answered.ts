import { ApiResponse } from "../../api-response";
import { CaseQuestion } from "../../models/CaseQuestion";

export const Api_CaseQuestionsViewAnswered_Endpoint = (payload: { medical_case_id: number }) =>
    `case_questions/medical_case/${payload.medical_case_id}/answered`;

export const Api_CaseQuestionsViewAnswered_HttpMethod = "GET";

export interface Api_CaseQuestionsViewAnswered_Response extends ApiResponse {
    data?: {
        case_questions: CaseQuestion[];
    };
}
