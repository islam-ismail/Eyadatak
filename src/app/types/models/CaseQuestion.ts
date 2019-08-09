import { QuestionTemplate } from "./QuestionTemplate";
import { CaseQuestionAnswer } from "./CaseQuestionAnswer";

export interface CaseQuestion {
    id: number;
    case_id: number;
    question_template_id: number;
    answered: number;
    question_template: QuestionTemplate;
    answer?: CaseQuestionAnswer;
    created_at: string;
    updated_at: string;
}
