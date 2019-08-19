import React, { HTMLProps, SFC } from "react";

interface FieldConfig {
    input: HTMLProps<HTMLInputElement>;
    label: string;
    meta?: { touched: boolean; dirty: boolean; error: string };
    type: string;
    placeholder: string;
}

const TextInputRegular: SFC<FieldConfig> = ({
    input,
    type,
    label,
    meta = { touched: false, error: "", dirty: false },
    placeholder
}) => {
    const groupClasses =
        meta.touched && meta.error ? "input-group-regular error" : "input-group-regular";

    return (
        <div className={groupClasses}>
            <label>{label}</label>
            <input {...input} type={type} className="chat-reply" placeholder={placeholder} />
            {meta.touched && meta.error && <span className="error">{meta.error}</span>}
        </div>
    );
};

export default TextInputRegular;
