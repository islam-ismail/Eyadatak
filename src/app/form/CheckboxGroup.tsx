import React, { Component, ChangeEvent } from "react";

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

interface CompProps {
    input: { name: string; value?: string[]; onChange?: (arr: string[]) => void };
    meta?: { touched: boolean; error: string };
    options: {
        label: string;
        value: string;
    }[];
}

class CheckboxGroup extends Component<CompProps> {
    field = ({
        input,
        meta,
        options
    }: {
        input: { name: string; value: string[]; onChange: (arr: string[]) => void };
        meta: { touched: boolean; error: string };
        options: {
            label: string;
            value: string;
        }[];
    }) => {
        const { name, onChange } = input;
        const { touched, error } = meta;
        const inputValue = input.value;

        const checkboxes = options.map(
            ({ label, value }: { label: string; value: string }, index: number) => {
                const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                        <span className="check-mark">{label}</span>
                    </div>
                );
            }
        );

        return (
            <>
                {checkboxes}
                {touched && !!error && <span className="error">{error}</span>}
            </>
        );
    };

    render() {
        return <Field {...this.props} type="checkbox" component={this.field} />;
    }
}

export default CheckboxGroup;
