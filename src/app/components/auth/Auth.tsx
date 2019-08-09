import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import * as actions from "./authActions";
import { getJWT, isTokenExpired } from "../../util/helpersFunc";

class Auth extends React.Component {
    componentDidMount() {
        const token = getJWT();

        if (!token || isTokenExpired(token)) {
            this.props.signOut();
            this.props.history.push("/");
        }
    }

    componentDidUpdate(prevProp) {
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

const mapState = state => ({
    authenticated: state.auth.authenticated,
    loading: state.global.loading
});

export default compose(
    withRouter,
    connect(
        mapState,
        actions
    )
)(Auth);
