import React, { Component, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import * as actions from "./myCasesListActions";
import MyCasesListTable from "./MyCasesListTable";
import Loader from "../layout/Loader";
import { adjustDateTimeZone } from "../../util/helpersFunc";
import Button from "../../UIComponents/Button";
import { AppState } from "../../reducers/rootReducer";
import { MedicalCase } from "../../types/models/MedicalCase";
import { CaseTransfer } from "../../types/models/CaseTransfer";
import { MyCasesListActionsSignatures } from "./myCasesListTypes";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    loading: state.global.loading,
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated,
    medicalCases: state.myCasesList.medicalCases,
    pendingTransfers: state.myCasesList.pendingTransfers
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = MyCasesListActionsSignatures;

type CompProps = RouteComponentProps & CompStateProps & CompActionProps;

interface CompState {
    myCases: MedicalCase[];
    pendingTransfers: CaseTransfer[];
    label: string;
    redirect: boolean;
    clickedCase: MedicalCase | null;
}

class MyCasesList extends Component<CompProps, CompState> {
    state: CompState = {
        redirect: false,
        clickedCase: null,
        myCases: [],
        label:
            this.props.location.state === undefined || this.props.location.state.label === undefined
                ? "ALL MY CASES"
                : this.props.location.state.label,
        pendingTransfers: this.props.pendingTransfers
    };

    componentDidMount() {
        if (this.props.authenticated) {
            if (
                (!this.props.medicalCases ||
                    this.props.medicalCases.length === 0 ||
                    (this.props.location.state &&
                        this.props.location.state.source === "SideNav")) &&
                this.props.signedInUser
            ) {
                this.props.getMyCasesList(this.props.signedInUser);
            } else {
                this.setState(() => ({
                    myCases: this.props.medicalCases
                }));
            }
            this.props.filterCasesList(this.state.label, this.props.medicalCases);
        }
    }

    componentDidUpdate(prevProps: CompProps) {
        if (prevProps.medicalCases !== this.props.medicalCases) {
            this.setState(() => ({
                myCases: this.props.medicalCases
            }));
        }
        if (prevProps.location.state.label !== this.props.location.state.label) {
            this.setState(() => ({
                label:
                    this.props.location.state === undefined ||
                    this.props.location.state.label === undefined
                        ? "ALL MY CASES"
                        : this.props.location.state.label
            }));
            if (
                this.props.location.state === undefined ||
                this.props.location.state.label === undefined
            ) {
                this.props.filterCasesList("ALL", this.props.medicalCases);
            }
        }
        if (this.props.location.state.source === "SideNav") {
            this.props.sortCasesListRequest("updated_at", "desc", this.props.medicalCases);
        }
        if (prevProps.pendingTransfers !== this.props.pendingTransfers) {
            this.setState(() => ({
                pendingTransfers: this.props.pendingTransfers
            }));
        }
    }

    caseClicked = (clickedCase: MedicalCase) => {
        this.setState(() => ({
            redirect: true,
            clickedCase: clickedCase
        }));
    };

    acceptTransfer = (caseTransferId: number) => {
        if (this.props.signedInUser) {
            this.props.acceptCaseTransfer(caseTransferId, this.props.signedInUser.id);
        }
    };

    rejectTransfer = (caseTransferId: number) => {
        if (this.props.signedInUser) {
            this.props.rejectCaseTransfer(caseTransferId, this.props.signedInUser.id);
        }
    };

    render() {
        if (this.props.signedInUser && this.state.redirect) {
            return (
                <Redirect
                    to={{
                        pathname: "/case-details",
                        state: {
                            chatCase: this.state.clickedCase,
                            userType: this.props.signedInUser.type
                        }
                    }}
                />
            );
        }
        if (!this.props.authenticated) {
            return <Redirect to="/" />;
        }
        if (this.props.loading) {
            return <Loader loading={this.props.loading} />;
        } else {
            return (
                <>
                    {this.state.label === "TRANSFER CASES" ? (
                        <>
                            {this.state.pendingTransfers.length === 0 ? (
                                <>
                                    <Redirect to="/" />
                                </>
                            ) : (
                                <>
                                    {this.state.pendingTransfers.map(caseTransfer => (
                                        <div key={caseTransfer.id}>
                                            <div>Case ID: {caseTransfer.medical_case.id}</div>
                                            <div>
                                                Description: {caseTransfer.medical_case.description}
                                            </div>
                                            <div>From Doctor: {caseTransfer.from_doctor.name}</div>
                                            <div>
                                                Created at:{" "}
                                                {adjustDateTimeZone(caseTransfer.created_at)}
                                            </div>
                                            <Button
                                                onClick={() => this.acceptTransfer(caseTransfer.id)}
                                                size="small"
                                                theme="green"
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                onClick={() => this.rejectTransfer(caseTransfer.id)}
                                                size="small"
                                                theme="grey"
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    ) : this.props.signedInUser ? (
                        <MyCasesListTable
                            caseClicked={this.caseClicked}
                            userType={this.props.signedInUser.type}
                        />
                    ) : (
                        ""
                    )}
                    <aside />
                </>
            );
        }
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(
        mapState,
        actions
    )
)(MyCasesList);
