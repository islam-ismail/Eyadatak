import { ApiResponse } from "../../api-response";
import { QuestionTemplate } from "../../models/QuestionTemplate";

export const Api_QuestionTemplatesViewNotRequired_Endpoint = (speciality_id = 0) =>
    `question_templates/${speciality_id}/not_required`;

export const Api_QuestionTemplatesViewNotRequired_HttpMethod = "GET";

export interface Api_QuestionTemplatesViewNotRequired_Response extends ApiResponse {
    data?: {
        question_templates: QuestionTemplate[];
    };
}
