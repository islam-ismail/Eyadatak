import React, { SFC } from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    label: string;
    type: string;
    wrapperClass?: string;
}
const UploadInput: SFC<FieldConfig> = ({
    input: { value, ...restInput },
    label,
    meta = { touched: false, error: "", dirty: false },
    wrapperClass
}) => {
    let inputGroupClass = wrapperClass ? wrapperClass : "input-group-regular";
    const groupClasses =
        meta && meta.touched && !!meta.error ? inputGroupClass + " error" : inputGroupClass;

    return (
        <div className={groupClasses}>
            <label>{label}</label>

            <input type="file" accept=".jpg, .png, .jpeg" {...restInput} />
            {meta.touched && !!meta.error && <span className="error">{meta.error}</span>}
        </div>
    );
};

export default UploadInput;
