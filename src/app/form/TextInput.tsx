import React, { SFC } from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    label: string;
    type: string;
}

const TextInput: SFC<FieldConfig> = ({
    input,
    type,
    label,
    meta = { touched: false, error: "", dirty: false }
}) => {
    const groupClasses = meta.touched && !!meta.error ? "input-group error" : "input-group";

    return (
        <div className={groupClasses}>
            <label className={meta.dirty ? "dirty" : ""}>{label}</label>
            <input {...input} type={type} />
            <span className="highlight" />
            <span className="bar" />
            {meta.touched && !!meta.error && <span className="err-msg">{meta.error}</span>}
        </div>
    );
};

export default TextInput;
