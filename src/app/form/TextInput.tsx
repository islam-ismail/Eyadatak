import React from "react";

const TextInput = ({ input, type, label, meta: { touched, error, dirty } }) => {
  const groupClasses =
    touched && !!error ? "input-group error" : "input-group";

  return (
    <div className={groupClasses}>
      <label className={dirty ? "dirty" : ""}>{label}</label>
      <input {...input} type={type} />
      <span className="highlight" />
      <span className="bar" />
      {touched && !!error && <span className="err-msg">{error}</span>}
    </div>
  );
};

export default TextInput;
