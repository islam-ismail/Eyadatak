import React, { Component, ComponentType } from "react";
import SignInForm from "./SignInForm";
import { compose } from "redux";
import { RouteComponentProps, withRouter } from "react-router";
import { AppState } from "../../reducers/rootReducer";
import { connect } from "react-redux";

const mapState = (state: AppState) => ({
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated
});

type CompStateProps = ReturnType<typeof mapState>;

interface CompOwnProps {
    switchScreens: (screenName: string) => void;
}

type CompProps = RouteComponentProps & CompOwnProps & CompStateProps;

class SignIn extends Component<CompProps> {
    componentDidUpdate() {
        const { authenticated, history } = this.props;
        if (authenticated) {
            history.push("/dashboard");
        }
    }

    render() {
        return (
            <div className="login-form">
                <div className="title">
                    <h2>تسجيل الدخول</h2>
                </div>
                <SignInForm switchScreens={this.props.switchScreens} />
            </div>
        );
    }
}

export default compose<ComponentType<CompOwnProps>>(
    withRouter,
    connect<CompStateProps, {}, CompOwnProps, AppState>(mapState)
)(SignIn);
