import { ApiResponse } from "../../../api-response";
import { CaseQuestion } from "../../../models/CaseQuestion";

export const Api_DoctorCaseQuestionsAdd_Endpoint = (medical_case_id: number) =>
    `doctor/case_questions/${medical_case_id}`;

export const Api_DoctorCaseQuestionsAdd_HttpMethod = "POST";

export interface Api_DoctorCaseQuestionsAdd_Payload {
    question_template_id: number;
}

export interface Api_DoctorCaseQuestionsAdd_Response extends ApiResponse {
    data?: {
        case_question: CaseQuestion;
    };
}
