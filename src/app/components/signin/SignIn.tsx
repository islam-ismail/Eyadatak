import React from "react";
import SignInForm from "./SignInForm";

const SingIn = ({ switchScreens }) => {
    return (
        <>
            <div className="login-form">
                <div className="title">
                    <h2>تسجيل الدخول</h2>
                </div>
                <SignInForm switchScreens={switchScreens} />
            </div>
        </>
    );
};

export default SingIn;
