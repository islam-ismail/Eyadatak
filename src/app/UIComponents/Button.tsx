import React from "react";

const Button = props => {
    const {
        type = "button",
        theme = "default",
        size = "normal",
        disabled = false,
        icon = "",
        title = "",
        extraclasses = ""
    } = props;

    return (
        <button
            type={type}
            className={`btn btn-${theme} ${size} ${icon} ${extraclasses}`}
            disabled={disabled}
            title={title}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default Button;
