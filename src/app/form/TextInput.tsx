import React, { SFC } from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    label: string;
    type: string;
    wrapperClass?: string;
}

const TextInput: SFC<FieldConfig> = ({
    input,
    type,
    label,
    wrapperClass,
    meta = { touched: false, error: "", dirty: false }
}) => {
    let inputGroupClass = wrapperClass ? wrapperClass : "input-group";
    const groupClasses =
        meta && meta.touched && !!meta.error ? inputGroupClass + " error" : inputGroupClass;

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
