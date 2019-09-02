import React, { SFC } from "react";
import { Field } from "redux-form";
import { CaseQuestion } from "../../../types/models/CaseQuestion";
import SelectInput from "../../../form/SelectInput";

interface CompProps {
    question: CaseQuestion;
}

export const SelectInputQuestion: SFC<CompProps> = props => {
    const selectOptions = props.question.question_template.question_options_ar.map(
        (value, key) => ({
            label: value,
            value: value,
            key: value
        })
    );
    return (
        <>
            <Field
                key={props.question.id}
                name={`unanswered_case_questions[${props.question.id}]`}
                type="select"
                component={SelectInput}
                options={selectOptions}
            />
        </>
    );
};
