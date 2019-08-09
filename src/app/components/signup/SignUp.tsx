import React from "react";
import SignUpForm from "./SignUpForm";

const SingUp = ({ switchScreens }) => {
    return (
        <>
            <div className="login-form">
                <div className="title">
                    <h2>تسجيل الدخول</h2>
                </div>
                <SignUpForm switchScreens={switchScreens} />
            </div>
        </>
    );
};

export default SingUp;
