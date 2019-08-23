import { ApiResponse } from "../../../api-response";
import { CaseQuestion } from "../../../models/CaseQuestion";

export const Api_PatientCaseQuestionsAnswer_Endpoint = (
    medical_case_id: number,
    case_question_id: number
) => `patient/case_questions/${medical_case_id}/${case_question_id}`;

export const Api_PatientCaseQuestionsAnswer_HttpMethod = "POST";

export interface Api_PatientCaseQuestionsAnswer_Payload {
    question_answer: any;
}

export interface Api_PatientCaseQuestionsAnswer_Response extends ApiResponse {
    data?: {
        case_question: CaseQuestion;
    };
}
