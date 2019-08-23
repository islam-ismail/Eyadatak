import React, { SFC } from "react";
// import NProgress from "nprogress";
import { BarLoader } from "react-spinners";

const Loader: SFC<{ loading: boolean }> = props => {
    const groupClasses = props.loading ? "globalLoader show" : "globalLoader";
    return (
        <div className={groupClasses}>
            <BarLoader height={4} width={100} color="#36D7B7" loading={props.loading} />
        </div>
    );
};

export default Loader;
