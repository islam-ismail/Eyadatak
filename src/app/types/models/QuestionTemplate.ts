export interface QuestionTemplate {
    id: number;
    speciality_id: number;
    question_text_en: string;
    question_text_ar: string;
    question_type: string;
    question_options_en: string;
    question_options_ar: string;
    used_counter: number;
    required: number;
}
