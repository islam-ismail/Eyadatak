import React from "react";

const UploadInput = ({
    input: { value, ...restInput },
    type,
    label,
    meta: { touched, error, dirty }
}) => {
    const groupClasses =
        touched && !!error
            ? "input-group-regular error"
            : "input-group-regular";

    return (
        <div className={groupClasses}>
            <label>{label}</label>

            <input type="file" accept=".jpg, .png, .jpeg" {...restInput} />
            {touched && !!error && <span className="error">{error}</span>}
        </div>
    );
};

export default UploadInput;
