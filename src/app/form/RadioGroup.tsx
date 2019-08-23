import React, { SFC } from "react";
import { WrappedFieldProps } from "redux-form";

interface FieldConfig extends WrappedFieldProps {
    label: string;
    options: {
        key: number;
        title: string;
        value: string;
    }[];
}

const RadioGroup: SFC<FieldConfig> = props => {
    return (
        <>
            {props.input.name === "specialityOrDoctor" ? (
                <div className="radio-group">
                    {props.options.map(option => (
                        <div key={option.value} className="radio">
                            <input
                                type="radio"
                                {...props.input}
                                value={option.value}
                                checked={option.value === props.input.value}
                            />
                            <span>{option.title}</span>
                        </div>
                    ))}
                    {props.meta.touched && !!props.meta.error && (
                        <span className="err-msg">{props.meta.error}</span>
                    )}
                </div>
            ) : (
                <>
                    {props.options.map(option => (
                        <div key={option.key} className="radio">
                            <input
                                type="radio"
                                {...props.input}
                                value={option.value}
                                checked={option.value === props.input.value}
                            />
                            <span className="check-mark">{option.value}</span>
                        </div>
                    ))}
                    {props.meta.touched && !!props.meta.error && (
                        <span className="err-msg">{props.meta.error}</span>
                    )}
                </>
            )}
        </>
    );
};

export default RadioGroup;
