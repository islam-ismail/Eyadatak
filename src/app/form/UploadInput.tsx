import React, { SFC } from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    label: string;
    type: string;
}
const UploadInput: SFC<FieldConfig> = ({
    input: { value, ...restInput },
    label,
    meta = { touched: false, error: "", dirty: false }
}) => {
    const groupClasses =
        meta.touched && !!meta.error ? "input-group-regular error" : "input-group-regular";

    return (
        <div className={groupClasses}>
            <label>{label}</label>

            <input type="file" accept=".jpg, .png, .jpeg" {...restInput} />
            {meta.touched && !!meta.error && <span className="error">{meta.error}</span>}
        </div>
    );
};

export default UploadInput;
