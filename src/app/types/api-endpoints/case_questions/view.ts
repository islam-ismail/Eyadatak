import { ApiResponse } from "../../api-response";
import { CaseQuestion } from "../../models/CaseQuestion";

export const Api_CaseQuestionsView_Endpoint = (case_question_id: number) =>
    `case_questions/${case_question_id}`;

export const Api_CaseQuestionsView_HttpMethod = "GET";

export interface Api_CaseQuestionsView_Response extends ApiResponse {
    data?: {
        case_question: CaseQuestion;
    };
}
