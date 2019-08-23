import React, { SFC } from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    label: string;
    options: {
        key: number;
        value: string;
    }[];
    multiple: boolean;
    className: string;
}

const SelectInputRegular: SFC<FieldConfig> = ({
    input,
    multiple,
    options,
    label,
    meta = { touched: false, error: "", dirty: false },
    className
}) => {
    let groupClasses =
        meta.touched && !!meta.error ? "input-group-regular error" : "input-group-regular";

    return (
        <div className={groupClasses}>
            <h4>{label}</h4>
            <select {...input} multiple={multiple} className={className}>
                <option value="" />
                {options &&
                    options.map(option => (
                        <option key={option.key} value={option.key}>
                            {option.value}
                        </option>
                    ))}
            </select>
            {meta.touched && !!meta.error && <span className="err-msg">{meta.error}</span>}
        </div>
    );
};

export default SelectInputRegular;
