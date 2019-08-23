import { ApiResponse } from "../../../api-response";
import { CaseQuestion } from "../../../models/CaseQuestion";

export const Api_DoctorCaseQuestionsAddByNewTemplate_Endpoint = (medical_case_id: number) =>
    `doctor/case_questions/template/${medical_case_id}`;

export const Api_DoctorCaseQuestionsAddByNewTemplate_HttpMethod = "POST";

export interface Api_DoctorCaseQuestionsAddByNewTemplate_Payload {
    speciality_id: number;
    question_text_en: string;
    question_text_ar: string;
    question_type: string;
    question_options_en?: string;
    question_options_ar?: string;
}

export interface Api_DoctorCaseQuestionsAddByNewTemplate_Response extends ApiResponse {
    data?: {
        case_question: CaseQuestion;
    };
}
