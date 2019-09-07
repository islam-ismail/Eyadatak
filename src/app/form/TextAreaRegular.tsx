import React, { SFC } from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    label: string;
    type: string;
    placeholder: string;
    className?: string;
    wrapperClass?: string;
}

const TextAreaRegular: SFC<FieldConfig> = ({
    input,
    label,
    className,
    meta = { touched: false, error: "", dirty: false },
    wrapperClass,
    placeholder
}) => {
    let inputGroupClass = wrapperClass ? wrapperClass : "input-group-regular";
    const groupClasses =
        meta && meta.touched && !!meta.error ? inputGroupClass + " error" : inputGroupClass;

    return (
        <div className={groupClasses}>
            <label>{label}</label>
            <textarea
                {...input}
                className={className ? className : "chat-reply"}
                placeholder={placeholder}
            />
            {meta.touched && !!meta.error && <span className="error">{meta.error}</span>}
        </div>
    );
};

export default TextAreaRegular;
