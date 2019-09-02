import { ApiResponse } from "../../../api-response";
import { QuestionTemplate } from "../../../models/QuestionTemplate";

export const Api_PatientQuestionTemplatesViewRequired_Endpoint = (
    speciality_id: number,
    patient_id?: number
) => `patient/question_templates/${speciality_id}/required${patient_id ? "/" + patient_id : ""}`;

export const Api_PatientQuestionTemplatesViewRequired_HttpMethod = "GET";

export interface Api_PatientQuestionTemplatesViewRequired_Response extends ApiResponse {
    data?: {
        question_templates: QuestionTemplate[];
    };
}
