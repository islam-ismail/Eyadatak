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
    wrapperClass?: string;
}

const SelectInputRegular: SFC<FieldConfig> = ({
    input,
    multiple,
    options,
    label,
    meta = { touched: false, error: "", dirty: false },
    wrapperClass,
    className
}) => {
    let inputGroupClass = wrapperClass ? wrapperClass : "input-group-regular";
    let groupClasses =
        meta && meta.touched && !!meta.error ? inputGroupClass + " error" : inputGroupClass;

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
