import { ApiResponse } from "../../../api-response";
import { QuestionTemplate } from "../../../models/QuestionTemplate";

export const Api_DoctorQuestionTemplatesAdd_Endpoint = () => `doctor/question_templates`;

export const Api_DoctorQuestionTemplatesAdd_HttpMethod = "POST";

export interface Api_DoctorQuestionTemplatesAdd_Payload {
    question_text_en: string;
    question_text_ar: string;
    question_type: string;
    question_options_en?: string[];
    question_options_ar?: string[];
}

export interface Api_DoctorQuestionTemplatesAdd_Response extends ApiResponse {
    data?: {
        question_template: QuestionTemplate;
    };
}
