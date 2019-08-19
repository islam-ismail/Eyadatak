import React, { SFC } from "react";
import RadioGroup from "../../../form/RadioGroup";
import { Field } from "redux-form";
import { CaseQuestion } from "../../../types/models/CaseQuestion";

interface CompProps {
    question: CaseQuestion;
}

export const RadioInputQuestion: SFC<CompProps> = props => {
    const radioOptions = props.question.question_template.question_options_ar.map((value, key) => ({
        label: value,
        value: value,
        key: key
    }));
    return (
        <>
            <div className="radio-group">
                <Field
                    component={RadioGroup}
                    name={`unanswered_case_questions[${props.question.id}]`}
                    required={true}
                    options={radioOptions}
                />
            </div>
        </>
    );
};
