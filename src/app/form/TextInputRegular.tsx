import React from "react";

const TextInputRegular = ({
    input,
    type,
    label,
    meta: { touched, error, dirty },
    placeholder
}) => {
    const groupClasses =
        touched && !!error
            ? "input-group-regular error"
            : "input-group-regular";

    return (
        <div className={groupClasses}>
            <label>{label}</label>
            <input {...input} type={type} className='chat-reply' placeholder={placeholder} />
            {touched && !!error && <span className="error">{error}</span>}
        </div>
    );
};

export default TextInputRegular;
