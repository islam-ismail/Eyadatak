import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import PatientChatView from "./PatientChatView";
import DoctorChatView from "./DoctorChatView";

class ChatViews extends Component {
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

const mapState = state => ({
    authenticated: state.auth.authenticated
});

export default compose(
    withRouter,
    connect(mapState)
)(ChatViews);
