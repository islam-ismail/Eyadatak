import { ApiResponse } from "../../api-response";
import { CaseQuestion } from "../../models/CaseQuestion";

export const Api_CaseQuestionsViewUnanswered_Endpoint = (medical_case_id: number) =>
    `case_questions/medical_case/${medical_case_id}/unanswered`;

export const Api_CaseQuestionsViewUnanswered_HttpMethod = "GET";

export interface Api_CaseQuestionsViewUnanswered_Response extends ApiResponse {
    data?: {
        case_questions: CaseQuestion[];
    };
}
