import React, { SFC } from "react";
import { Field } from "redux-form";
import TextInputRegular from "../../../form/TextInputRegular";
import { CaseQuestion } from "../../../types/models/CaseQuestion";

interface CompProps {
    question: CaseQuestion;
}
export const TextInputQuestion: SFC<CompProps> = props => {
    return (
        <>
            <Field
                key={props.question.id}
                name={`unanswered_case_questions[${props.question.id}]`}
                type="text"
                component={TextInputRegular}
                placeholder="اكتب إجابتك هنا..."
            />
        </>
    );
};
