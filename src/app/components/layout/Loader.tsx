import React, { SFC } from "react";
// import NProgress from "nprogress";
import { BarLoader } from "react-spinners";

const Loader: SFC<{ loading: boolean }> = props => {
    const groupClasses = props.loading ? "globalLoader show" : "globalLoader";
    return (
        <div className={groupClasses}>
            <BarLoader
                height={150}
                heightUnit={"px"}
                width={150}
                widthUnit={"px"}
                loading={props.loading}
                color={"#000000"}
            />
        </div>
    );
};

export default Loader;
