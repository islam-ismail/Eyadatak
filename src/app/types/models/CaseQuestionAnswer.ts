/** @todo review referencing CaseQuestion here */
// import { CaseQuestion } from "./CaseQuestion";
import { QuestionTemplate } from "./QuestionTemplate";

export interface CaseQuestionAnswer {
    id: number;
    case_id: number;
    question_template_id: number;
    patient_id: number;
    question_answer: string;
    created_at: string;
    updated_at: string;
    question_template?: QuestionTemplate;
    // case_question?: CaseQuestion;
}
