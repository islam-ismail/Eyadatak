import React, { Component, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import PatientChatView from "./PatientChatView";
import DoctorChatView from "./DoctorChatView";
import { AppState } from "../../reducers/rootReducer";

const mapState = (state: AppState) => ({
    authenticated: state.auth.authenticated
});

type CompStateProps = ReturnType<typeof mapState>;
type CompProps = CompStateProps & RouteComponentProps;

class ChatViews extends Component<CompProps> {
    render() {
        if (!this.props.authenticated) {
            return <Redirect to="/" />;
        }
        if (this.props.location.state.userType === "doctor") {
            return <DoctorChatView chatCase={this.props.location.state.chatCase} />;
        } else {
            return <PatientChatView chatCase={this.props.location.state.chatCase} />;
        }
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(mapState)
)(ChatViews);
