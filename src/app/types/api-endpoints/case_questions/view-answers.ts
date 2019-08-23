import { ApiResponse } from "../../api-response";
import { CaseQuestionAnswer } from "../../models/CaseQuestionAnswer";

export const Api_CaseQuestionsViewAnswers_Endpoint = (medical_case_id: number) =>
    `case_questions/medical_case/${medical_case_id}/answers`;

export const Api_CaseQuestionsViewAnswers_HttpMethod = "GET";

export interface Api_CaseQuestionsViewAnswers_Response extends ApiResponse {
    data?: {
        answers: CaseQuestionAnswer[];
    };
}
