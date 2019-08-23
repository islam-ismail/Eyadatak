import { ApiResponse } from "../../../api-response";
import { QuestionTemplate } from "../../../models/QuestionTemplate";

export const Api_DoctorQuestionTemplatesViewAll_Endpoint = () => `doctor/question_templates`;

export const Api_DoctorQuestionTemplatesViewAll_HttpMethod = "GET";

export interface Api_DoctorQuestionTemplatesViewAll_Response extends ApiResponse {
    data?: {
        question_templates: QuestionTemplate[];
    };
}
