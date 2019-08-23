import React, { SFC } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    type: string;
    label: string;
    props: ReactDatePickerProps[];
}
const DateInput: SFC<FieldConfig> = ({
    input: { value, onChange, ...restInput },
    type,
    label,
    meta: { touched, error, dirty },
    ...props
}) => {
    let groupClasses = touched && !!error ? "input-group error" : "input-group";
    let selectedDate: Date;

    if (value && value != "") {
        selectedDate = new Date(value as string);
    } else {
        selectedDate = new Date();
    }

    return (
        <div className={groupClasses}>
            <DatePicker {...props} {...restInput} selected={selectedDate} onChange={onChange} />
            <span className="highlight" />
            <span className="bar" />
            <label className={dirty ? "dirty" : ""}>{label}</label>
            {touched && !!error && <span className="error">{error}</span>}
        </div>
    );
};

export default DateInput;
