import React, { SFC, ReactNode, EventHandler, MouseEvent } from "react";
interface FieldConfig {
    type?: "button" | "submit" | "reset";
    theme?: string;
    size?: string;
    disabled?: boolean;
    icon?: string;
    title?: string;
    extraclasses?: string;
    children: string | ReactNode | Element;
    onClick?: EventHandler<MouseEvent>;
}

const Button: SFC<FieldConfig> = props => {
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
