import { ApiResponse } from "../../api-response";
import { QuestionTemplate } from "../../models/QuestionTemplate";

export const Api_QuestionTemplatesViewRequired_Endpoint = (speciality_id = 0) =>
    `question_templates/${speciality_id}/required`;

export const Api_QuestionTemplatesViewRequired_HttpMethod = "GET";

export interface Api_QuestionTemplatesViewRequired_Response extends ApiResponse {
    data?: {
        question_templates: QuestionTemplate[];
    };
}
