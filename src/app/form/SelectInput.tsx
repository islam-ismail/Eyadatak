import React, { Component } from "react";
import { WrappedFieldProps } from "redux-form";

interface CompProps extends WrappedFieldProps {
    label: string;
    options: {
        key: number;
        title: string;
        value: string;
    }[];
    multiple: boolean;
    manyFields: boolean;
    className: string;
    onBirthdayFieldChange: (error: string) => void;
}

class SelectInput extends Component<CompProps> {
    componentDidMount() {
        if (
            this.props.manyFields &&
            this.props.meta &&
            this.props.meta.touched &&
            !!this.props.meta.error
        ) {
            this.props.onBirthdayFieldChange(this.props.meta.error);
        }
    }

    componentDidUpdate(prevProps: CompProps) {
        if (
            this.props.manyFields &&
            this.props.meta &&
            this.props.meta.touched &&
            !!this.props.meta.error
        ) {
            this.props.onBirthdayFieldChange("برجاء إدخال تاريخ الميلاد");
        }
        if (
            this.props.manyFields &&
            this.props.meta &&
            this.props.meta.touched &&
            !this.props.meta.error
        ) {
            this.props.onBirthdayFieldChange("");
        }
    }

    render() {
        const { input, multiple, options, label, className, manyFields } = this.props;
        const meta = this.props.meta as { touched: boolean; dirty: boolean; error: string };

        let groupClasses =
            meta && meta.touched && !!meta.error ? "input-group error" : "input-group";

        return (
            <div className={groupClasses}>
                {manyFields ? <></> : <label className={meta.dirty ? "dirty" : ""}>{label}</label>}
                <select {...input} multiple={multiple} className={className ? className : ""}>
                    {manyFields ? <option value="">{label}</option> : <option value="" disabled />}
                    {options &&
                        options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.key}
                            </option>
                        ))}
                </select>
                {/* <span className="highlight" />
      <span className="bar" /> */}
                {!manyFields && meta.touched && !!meta.error && (
                    <span className="err-msg">{meta.error}</span>
                )}
            </div>
        );
    }
}
export default SelectInput;
