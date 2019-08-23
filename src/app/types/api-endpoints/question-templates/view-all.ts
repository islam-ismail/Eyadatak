import { ApiResponse } from "../../api-response";
import { QuestionTemplate } from "../../models/QuestionTemplate";

export const Api_QuestionTemplatesViewAll_Endpoint = (speciality_id = 0) =>
    `question_templates/${speciality_id}`;

export const Api_QuestionTemplatesViewAll_HttpMethod = "GET";

export interface Api_QuestionTemplatesViewAll_Response extends ApiResponse {
    data?: {
        question_templates: QuestionTemplate[];
    };
}
