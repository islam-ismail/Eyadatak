import React, { SFC } from "react";
import logoWhite from "../../assets/images/logo-white.svg";
import { Link } from "react-router-dom";

const Logo: SFC = props => {
    return (
        <div className="logo">
            <Link
                to={{
                    pathname: "/dashboard",
                    state: { label: undefined, source: "SideNav" }
                }}
            >
                <img src={logoWhite} alt="Eyadatak Logo" />
            </Link>
        </div>
    );
};

export default Logo;
