import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";

const Layout = props => {
    return (
        <>
            <Header />
            <nav>
                <SideNav />
            </nav>
            <main className="content">{props.children}</main>
        </>
    );
};

export default Layout;
