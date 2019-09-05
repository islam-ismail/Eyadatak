import React, { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { AppState } from "../../reducers/rootReducer";
import * as actions from "../auth/authActions";
import { AuthActionsSignatures } from "../auth/authTypes";
import UserSettingsForm from "./UserSettingsForm";
import { getDayFromDate, getMonthFromDate, getYearFromDate } from "../../util/helpersFunc";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = AuthActionsSignatures;

type CompProps = CompStateProps & CompActionProps;

class UserSettings extends Component<CompProps> {
    render() {
        if (!this.props.authenticated) {
            return <Redirect to="/" />;
        }

        const { signedInUser } = this.props;
        let initialVals = {};

        if (signedInUser) {
            const year = getYearFromDate(signedInUser.birthdate || "");
            const month = getMonthFromDate(signedInUser.birthdate || "");
            const day = getDayFromDate(signedInUser.birthdate || "");

            initialVals = {
                name: signedInUser.name,
                email: signedInUser.email,
                year,
                month,
                day,
                gender: signedInUser.gender,
                phone_number: signedInUser.phone_number
            };
        }

        return (
            <>
                <div className="container">
                    <div className="page-content bg-white border-green">
                        <UserSettingsForm initialValues={initialVals} />
                    </div>
                </div>
            </>
        );
    }
}

export default compose<ComponentType>(
    connect(
        mapState,
        actions
    )
)(UserSettings);
