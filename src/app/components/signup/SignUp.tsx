import React, { ComponentType, Component } from "react";
import SignUpForm from "./SignUpForm";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../../reducers/rootReducer";
import { compose } from "redux";

const mapState = (state: AppState) => ({
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated
});

type CompStateProps = ReturnType<typeof mapState>;

interface CompOwnProps {
    switchScreens: (screenName: string) => void;
}

type CompProps = RouteComponentProps & CompOwnProps & CompStateProps;

class SingUp extends Component<CompProps> {
    componentDidUpdate() {
        const { authenticated, history } = this.props;
        if (authenticated) {
            history.push("/dashboard");
        }
    }

    render() {
        return (
            <>
                <div className="login-form">
                    <div className="title">
                        <h2>تسجيل الدخول</h2>
                    </div>
                    <SignUpForm switchScreens={this.props.switchScreens} />
                </div>
            </>
        );
    }
}

export default compose<ComponentType<CompOwnProps>>(
    withRouter,
    connect<CompStateProps, {}, CompOwnProps, AppState>(mapState)
)(SingUp);
