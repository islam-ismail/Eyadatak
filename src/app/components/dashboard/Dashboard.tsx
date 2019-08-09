import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../myCasesList/myCasesListActions";
import { BoxLink } from "./BoxLink";
import { Link } from "react-router-dom";
import { adjustDateZone } from "../../util/helpersFunc";
import profilePic from "../../assets/images/profile-pic01.svg";

class Dashboard extends Component {
    state = {
        myCases: [],
        pendingTransfers: []
    };

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.getMyCasesList(this.props.signedInUser);
        }
        // if (this.props.authenticated) {
        //   if (!this.props.medicalCases ||
        //     this.props.medicalCases.length === 0 ||
        //     (this.props.location.state &&
        //       this.props.location.state.source === 'SideNav')
        //   ) {
        //     this.props.getMyCasesList(this.props.signedInUser)
        //   } else {
        //     this.setState(() => ({
        //       myCases: this.props.medicalCases
        //     }))
        //   }
        // }
        if (this.props.authenticated && this.props.signedInUser.type === "doctor") {
            this.props.getPendingTransfersList(this.props.signedInUser.id);
        }
    }

    componentDidUpdate(prevProps) {
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
                            {this.props.signedInUser.type === "doctor" ? (
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
                                                myCase => myCase.status === "ALL MY CASES"
                                            ).length
                                        }
                                    />
                                    <BoxLink
                                        label="New"
                                        count={
                                            this.state.myCases.filter(
                                                myCase => myCase.status === "Open"
                                            ).length
                                        }
                                    />
                                    <BoxLink
                                        label="Waiting for doctor reply"
                                        count={
                                            this.state.myCases.filter(
                                                myCase =>
                                                    myCase.status === "Waiting for doctor reply"
                                            ).length
                                        }
                                    />
                                    <BoxLink
                                        label="Waiting for patient reply"
                                        count={
                                            this.state.myCases.filter(
                                                myCase =>
                                                    myCase.status === "Waiting for patient reply"
                                            ).length
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    {/* <p>PATIENT DASHBOARD LINKS</p> */}
                                    <BoxLink label="Wallet Balance" amount="123" />
                                    <BoxLink
                                        label="Open"
                                        count={
                                            this.state.myCases.filter(
                                                myCase => myCase.status !== "Closed"
                                            ).length
                                        }
                                    />
                                    <BoxLink
                                        label="Waiting for patient reply"
                                        count={
                                            this.state.myCases.filter(
                                                myCase =>
                                                    myCase.status === "Waiting for patient reply"
                                            ).length
                                        }
                                    />
                                    <BoxLink
                                        label="Waiting for doctor reply"
                                        count={
                                            this.state.myCases.filter(
                                                myCase =>
                                                    myCase.status === "Waiting for doctor reply"
                                            ).length
                                        }
                                    />
                                    <BoxLink
                                        label="Closed"
                                        count={
                                            this.state.myCases.filter(
                                                myCase => myCase.status === "Closed"
                                            ).length
                                        }
                                    />
                                </>
                            )}
                        </div>
                        <div className="recent-questions">
                            <div className="title">
                                <h4>آخر الأسئلة</h4>
                            </div>
                            <div className="questions">
                                {this.state.myCases
                                    .filter(myCase => myCase.status !== "Closed")
                                    .map(myCase => (
                                        <div key={myCase.id}>
                                            <Link
                                                to={{
                                                    pathname: "/case-details",
                                                    state: {
                                                        chatCase: myCase,
                                                        userType: this.props.signedInUser.type
                                                    }
                                                }}
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
                                                                {adjustDateZone(myCase.updated_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <aside />
            </>
        );
    }
}

const mapState = state => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated,
    medicalCases: state.myCasesList.medicalCases,
    pendingTransfers: state.myCasesList.pendingTransfers
});

export default compose(
    connect(
        mapState,
        actions
    )
)(Dashboard);
