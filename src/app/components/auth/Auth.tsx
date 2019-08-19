import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import { getJWT, isTokenExpired } from "../../util/helpersFunc";
import * as actions from "./authActions";
import { AppState } from "../../reducers/rootReducer";
import { AuthActionsSignatures } from "./authTypes";

const mapState = (state: AppState) => ({
    authenticated: state.auth.authenticated,
    loading: state.global.loading
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = AuthActionsSignatures;

type CompProps = RouteComponentProps & CompStateProps & CompActionProps;

class Auth extends React.Component<CompProps> {
    componentDidMount() {
        const token = getJWT();

        if (!token || isTokenExpired(token)) {
            this.props.signOut();
            this.props.history.push("/");
        }
    }

    componentDidUpdate(prevProp: CompProps) {
        if (
            prevProp.authenticated !== this.props.authenticated &&
            this.props.authenticated === false
        ) {
            this.props.history.push("/");
        }
        // console.log(
        //     "Auth DidUpdate: User Authenticated:",
        //     this.props.authenticated
        // );
    }

    render() {
        return <>{this.props.children}</>;
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(
        mapState,
        actions
    )
)(Auth);
