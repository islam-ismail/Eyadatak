import React from "react";

const SelectInputRegular = ({
  input,
  multiple,
  options,
  label,
  meta: { touched, error, dirty },
  className
}) => {
  let groupClasses =
    touched && !!error
      ? "input-group-regular error"
      : "input-group-regular";

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
      {touched && !!error && <span className="err-msg">{error}</span>}
    </div>
  );
};

export default SelectInputRegular;
