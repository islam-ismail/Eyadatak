import React, { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import loginShape1 from "../../assets/images/login-shape.svg";
import loginShape2 from "../../assets/images/login-shape2.svg";
import Loader from "../layout/Loader";
import SignIn from "../signin/SignIn";
import SignUp from "../signup/SignUp";
import { AppState } from "../../reducers/rootReducer";

const mapState = (state: AppState) => ({
    loading: state.global.loading,
    authenticated: state.auth.authenticated
});

type CompStateProps = ReturnType<typeof mapState>;

type CompProps = CompStateProps;

type CompState = {
    screen?: string;
};

class GateWay extends Component<CompProps, CompState> {
    state: CompState = {
        screen: "signin"
    };

    switchScreens = (screenName: string) => {
        this.setState(() => ({
            screen: screenName
        }));
    };

    render() {
        const screen =
            this.state.screen === "signin" ? (
                <SignIn switchScreens={this.switchScreens} />
            ) : (
                <SignUp switchScreens={this.switchScreens} />
            );

        if (!this.props.loading) {
            return (
                <>
                    {this.state.screen === "signin" ? (
                        <main className="content">
                            <div className="login-wrapper">
                                <div className="login-shape">
                                    <img className="shape1" src={loginShape1} alt="تسجيل الدخول" />
                                    <img className="shape2" src={loginShape2} alt="تسجيل الدخول" />
                                </div>
                                <div className="login-box">
                                    <div className="login-bg" />
                                    {screen}
                                </div>
                            </div>
                            <aside />
                        </main>
                    ) : (
                        <main className="content">
                            <div className="login-wrapper signup">
                                <div className="login-shape">
                                    <img className="shape1" src={loginShape1} alt="تسجيل الدخول" />
                                    <img className="shape2" src={loginShape2} alt="تسجيل الدخول" />
                                </div>
                                <div className="login-box">
                                    <div className="login-bg" />
                                    {screen}
                                </div>
                            </div>
                            <aside />
                        </main>
                    )}
                </>
            );
        } else {
            return <Loader loading={this.props.loading} />;
        }
    }
}

export default compose<ComponentType<CompProps>>(connect(mapState))(GateWay);
