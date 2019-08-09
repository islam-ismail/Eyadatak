import React from "react";
// import NProgress from "nprogress";
import { BarLoader } from "react-spinners";

const Loader = props => {
    const groupClasses = props.loading ? "globalLoader show" : "globalLoader";
    return (
        <div className={groupClasses}>
            <BarLoader loading={props.loading} color={"#000000"} sizeUnit={"px"} size={150} />
        </div>
    );
};

export default Loader;
