import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
    input: { value, onChange, ...restInput },
    type,
    label,
    meta: { touched, error, dirty },
    ...props
}) => {
    let groupClasses = touched && !!error ? "input-group error" : "input-group";

    return (
        <div className={groupClasses}>
            <DatePicker
                {...props}
                selected={value !== "" ? new Date(value) : null}
                onChange={onChange}
                {...restInput}
            />
            <span className="highlight" />
            <span className="bar" />
            <label className={dirty ? "dirty" : ""}>{label}</label>
            {touched && !!error && <span className="error">{error}</span>}
        </div>
    );
};

export default DateInput;
