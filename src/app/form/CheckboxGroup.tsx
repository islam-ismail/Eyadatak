import React, { Component } from "react";

// const CheckBox = ({ input, label, value, meta: { touched, error } }) => {
//     return (
//         <div className="checkboxes-group">
//             <label className="checkbox-check">
//                 <input type="checkbox" {...input} />{" "}
//                 <span className="check-mark" />
//                 <i>{label}</i>
//             </label>
//             {touched && !!error && <span className="error">{error}</span>}
//         </div>
//     );
// };

// export default CheckBox;

import { Field } from "redux-form";

class CheckboxGroup extends Component {
  field = ({ input, meta, options }) => {
    const { name, onChange } = input;
    const { touched, error } = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({ label, value }, index) => {
      const handleChange = event => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <div key={`checkbox-${index}`} className="checkbox">
          <input
            type="checkbox"
            name={`${name}[${index}]`}
            value={value}
            checked={checked}
            onChange={handleChange}
          />
          <span className="check-mark" >
            {label}
          </span>
        </div>
      );
    });

    return (
      <>
        {checkboxes}
        {touched && !!error && <span className="error">{error}</span>}
      </>
    );
  };

  render() {
    return (
      <Field {...this.props} type="checkbox" component={this.field} />
    );
  }
}

export default CheckboxGroup;
