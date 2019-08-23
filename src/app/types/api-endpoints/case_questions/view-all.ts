import { ApiResponse } from "../../api-response";
import { CaseQuestion } from "../../models/CaseQuestion";

export const Api_CaseQuestionsViewAll_Endpoint = (medical_case_id: number) =>
    `case_questions/medical_case/${medical_case_id}`;

export const Api_CaseQuestionsViewAll_HttpMethod = "GET";

export interface Api_CaseQuestionsViewAll_Response extends ApiResponse {
    data?: {
        case_questions: CaseQuestion[];
    };
}
