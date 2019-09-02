import React, { Component, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../myCasesList/myCasesListActions";
import { BoxLink } from "./BoxLink";
import { Link } from "react-router-dom";
import { adjustDateZone } from "../../util/helpersFunc";
import profilePic from "../../assets/images/profile-pic01.svg";
import { AppState } from "../../reducers/rootReducer";
import { User } from "../../types/models/User";
import { MedicalCase } from "../../types/models/MedicalCase";
import { CaseTransfer } from "../../types/models/CaseTransfer";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated,
    medicalCases: state.myCasesList.medicalCases,
    pendingTransfers: state.myCasesList.pendingTransfers
});

type CompStateProps = ReturnType<typeof mapState>;

interface CompActionProps {
    setMyCasesList(signedInUser: User): any;
    setPendingTransfersList(id: number): any;
}

type CompProps = CompStateProps & CompActionProps;

interface CompState {
    myCases: MedicalCase[];
    pendingTransfers: CaseTransfer[];
}

class Dashboard extends Component<CompProps, CompState> {
    state = {
        myCases: [],
        pendingTransfers: []
    };

    componentDidMount() {
        if (this.props.authenticated && this.props.signedInUser) {
            this.props.setMyCasesList(this.props.signedInUser);
        }
        // if (this.props.authenticated) {
        //   if (!this.props.medicalCases ||
        //     this.props.medicalCases.length === 0 ||
        //     (this.props.location.state &&
        //       this.props.location.state.source === 'SideNav')
        //   ) {
        //     this.props.setMyCasesList(this.props.signedInUser)
        //   } else {
        //     this.setState(() => ({
        //       myCases: this.props.medicalCases
        //     }))
        //   }
        // }
        if (
            this.props.authenticated &&
            this.props.signedInUser &&
            this.props.signedInUser.type === "doctor"
        ) {
            this.props.setPendingTransfersList(this.props.signedInUser.id);
        }
    }

    componentDidUpdate(prevProps: CompProps) {
        if (prevProps.medicalCases !== this.props.medicalCases) {
            this.setState(() => ({
                myCases: this.props.medicalCases
            }));
        }
        if (prevProps.pendingTransfers !== this.props.pendingTransfers) {
            this.setState(() => ({
                pendingTransfers: this.props.pendingTransfers
            }));
        }
    }

    render() {
        if (!this.props.authenticated) {
            return <Redirect to="/" />;
        }
        return (
            <>
                <div className="container">
                    <div className="dashboard">
                        <div className="stats">
                            {this.props.signedInUser ? (
                                this.props.signedInUser.type === "doctor" ? (
                                    <>
                                        {/* <p>DOCTOR {this.props.signedInUser.name} DASHBOARD LINKS</p> */}
                                        <BoxLink
                                            label="TRANSFER CASES"
                                            count={this.state.pendingTransfers.length}
                                        />
                                        <BoxLink
                                            label="ALL MY CASES"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status === "ALL MY CASES"
                                                ).length
                                            }
                                        />
                                        <BoxLink
                                            label="New"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status === "Open"
                                                ).length
                                            }
                                        />
                                        <BoxLink
                                            label="Waiting for doctor reply"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status === "Waiting for doctor reply"
                                                ).length
                                            }
                                        />
                                        <BoxLink
                                            label="Waiting for patient reply"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status ===
                                                        "Waiting for patient reply"
                                                ).length
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* <p>PATIENT DASHBOARD LINKS</p> */}
                                        <BoxLink label="Wallet Balance" amount={123} />
                                        <BoxLink
                                            label="Open"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status !== "Closed"
                                                ).length
                                            }
                                        />
                                        <BoxLink
                                            label="Waiting for patient reply"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status ===
                                                        "Waiting for patient reply"
                                                ).length
                                            }
                                        />
                                        <BoxLink
                                            label="Waiting for doctor reply"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status === "Waiting for doctor reply"
                                                ).length
                                            }
                                        />
                                        <BoxLink
                                            label="Closed"
                                            count={
                                                this.state.myCases.filter(
                                                    (myCase: MedicalCase) =>
                                                        myCase.status === "Closed"
                                                ).length
                                            }
                                        />
                                    </>
                                )
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="recent-questions">
                            <div className="title">
                                <h4>آخر الأسئلة</h4>
                            </div>
                            <div className="questions">
                                {this.state.myCases
                                    .filter((myCase: MedicalCase) => myCase.status !== "Closed")
                                    .map((myCase: MedicalCase) => (
                                        <div key={myCase.id}>
                                            {this.props.signedInUser ? (
                                                <Link
                                                    to={{ pathname: `/case-details/${myCase.id}` }}
                                                >
                                                    <div className="item">
                                                        <div className="pic">
                                                            <img
                                                                src={profilePic}
                                                                alt="الصورة الشخصية"
                                                            />
                                                            {/* {this.props.signedInUser.type === 'doctor'
                            ? <img src={myCase.patient.picture_url} alt='الصورة الشخصية' />
                            : <img src={myCase.doctor.picture_url} alt='الصورة الشخصية' />
                          } */}
                                                        </div>
                                                        <div className="desc">
                                                            <p>{myCase.description}</p>
                                                            <div className="date">
                                                                <p>
                                                                    {adjustDateZone(
                                                                        myCase.updated_at
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
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
)(Dashboard);
