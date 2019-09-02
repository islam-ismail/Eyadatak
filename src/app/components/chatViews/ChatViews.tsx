import React, { Component, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import PatientChatView from "./PatientChatView";
import DoctorChatView from "./DoctorChatView";
import { AppState } from "../../reducers/rootReducer";
import { User } from "../../types/models/User";
import * as actions from "../myCasesList/myCasesListActions";
import { MyCasesListActionsSignatures } from "../myCasesList/myCasesListTypes";
import { Doctor } from "../../types/models/Doctor";
import { MedicalCase } from "../../types/models/MedicalCase";

const mapState = (state: AppState) => ({
    authenticated: state.auth.authenticated,
    signedInUser: state.auth.signedInUser,
    medicalCases: state.myCasesList.medicalCases
});

type CompStateProps = ReturnType<typeof mapState>;
interface RouteParams {
    caseId: string;
}
type CompProps = MyCasesListActionsSignatures & CompStateProps & RouteComponentProps<RouteParams>;

class ChatViews extends Component<CompProps> {
    render() {
        const {
            match: { params }
        } = this.props;
        const caseId = parseInt(params.caseId, 10);

        if (!this.props.authenticated || !caseId) {
            return <Redirect to="/" />;
        }

        const signedInUser = this.props.signedInUser as User;

        let chatCase: MedicalCase | undefined = this.props.medicalCases.find(
            mc => mc.id === caseId
        );

        if (!chatCase && signedInUser.type === "patient") {
            this.props.setPatientCasesList(signedInUser);
        } else if (!chatCase && signedInUser.type === "doctor") {
            this.props.setDoctorCasesList(signedInUser as Doctor);
        }

        if (chatCase && signedInUser.type === "doctor") {
            return <DoctorChatView chatCase={chatCase} />;
        } else if (chatCase && signedInUser.type === "patient") {
            return <PatientChatView chatCase={chatCase} />;
        } else {
            return <></>;
        }
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(
        mapState,
        actions
    )
)(ChatViews);
