import React, { SFC } from "react";
import CheckboxGroup from "../../../form/CheckboxGroup";
import { CaseQuestion } from "../../../types/models/CaseQuestion";

interface CompProps {
    question: CaseQuestion;
}

export const CheckboxInputQuestion: SFC<CompProps> = props => {
    const checkBoxesOptions = props.question.question_template.question_options_ar.map(
        (value, key) => ({
            label: value,
            value: value
        })
    );
    return (
        <>
            <div className="checkbox-group">
                <CheckboxGroup
                    input={{ name: `unanswered_case_questions[${props.question.id}]` }}
                    options={checkBoxesOptions}
                />
            </div>
        </>
    );
};
