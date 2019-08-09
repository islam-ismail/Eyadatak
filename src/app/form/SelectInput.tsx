import React, { Component } from "react";

class SelectInput extends Component {
  componentDidMount() {
    if (this.props.manyFields &&
      this.props.meta.touched &&
      !!this.props.meta.error) {
      this.props.onBirthdayFieldChange(this.props.error)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.manyFields &&
      this.props.meta.touched &&
      !!this.props.meta.error) {
      this.props.onBirthdayFieldChange('برجاء إدخال تاريخ الميلاد')
    }
    if (this.props.manyFields &&
      this.props.meta.touched &&
      !this.props.meta.error) {
      this.props.onBirthdayFieldChange('')
    }
  }

  render() {
    const {
      input,
      multiple,
      options,
      label,
      meta: { touched, error, dirty },
      className,
      manyFields
    } = this.props

    let groupClasses = touched && !!error ? "input-group error" : "input-group";

    return (
      <div className={groupClasses}>
        {manyFields
          ? <></>
          : <label className={dirty ? "dirty" : ""}>{label}</label>
        }
        <select
          {...input}
          multiple={multiple}
          className={className ? className : ''}
        >
          {manyFields
            ? <option value="">{label}</option>
            : <option value="" disabled />
          }
          {options &&
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
        </select>
        {/* <span className="highlight" />
      <span className="bar" /> */}
        {!manyFields && touched && !!error && <span className="err-msg">{error}</span>}
      </div>
    );
  }
}
export default SelectInput;
