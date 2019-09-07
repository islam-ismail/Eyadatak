import React, { Component } from "react";
import SignUpForm from "./SignUpForm";

interface CompOwnProps {
    switchScreens: (screenName: string) => void;
}

type CompProps = CompOwnProps;

export default class SingUp extends Component<CompProps> {
    render() {
        return (
            <>
                <div className="login-form signup">
                    <div className="title">
                        <h2>التسجيل</h2>
                    </div>
                    <SignUpForm switchScreens={this.props.switchScreens} />
                </div>
            </>
        );
    }
}
