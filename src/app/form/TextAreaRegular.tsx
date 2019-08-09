import React from "react";

const TextAreaRegular = ({
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
            <textarea {...input} className='chat-reply' placeholder={placeholder} />
            {touched && !!error && <span className="error">{error}</span>}
        </div>
    );
};

export default TextAreaRegular;
