import React, { SFC } from "react";
import { Field } from "redux-form";
import TextAreaRegular from "../../../form/TextAreaRegular";
import { CaseQuestion } from "../../../types/models/CaseQuestion";

interface CompProps {
    question: CaseQuestion;
}

export const TextAreaQuestion: SFC<CompProps> = props => {
    return (
        <>
            <Field
                key={props.question.id}
                name={`unanswered_case_questions[${props.question.id}]`}
                type="text"
                component={TextAreaRegular}
                placeholder="اكتب إجابتك هنا..."
            />
        </>
    );
};
