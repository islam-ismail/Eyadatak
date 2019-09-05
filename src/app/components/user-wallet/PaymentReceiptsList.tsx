import React, { Component, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import * as actions from "./PaymentReceiptsListActions";
import PaymentReceiptsListTable from "./PaymentReceiptsListTable";
import Loader from "../layout/Loader";
import { AppState } from "../../reducers/rootReducer";
import { PaymentReceiptsListActionsSignatures } from "./PaymentReceiptsListTypes";
import { PaymentReceipt } from "../../types/models/PaymentReceipt";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    loading: state.global.loading,
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated,
    paymentReceipts: state.paymentReceipts.paymentReceipts
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = PaymentReceiptsListActionsSignatures;

type CompProps = RouteComponentProps & CompStateProps & CompActionProps;

interface CompState {
    paymentReceipts: PaymentReceipt[];
    label: string;
}

class PaymentReceiptsList extends Component<CompProps, CompState> {
    state: CompState = {
        paymentReceipts: [],
        label: "ALL"
    };

    componentDidMount() {
        if (this.props.authenticated) {
            if (
                (!this.props.paymentReceipts ||
                    this.props.paymentReceipts.length === 0 ||
                    (this.props.location.state &&
                        this.props.location.state.source === "SideNav")) &&
                this.props.signedInUser
            ) {
                this.props.setPaymentReceiptsList();
            } else {
                this.setState(() => ({
                    paymentReceipts: this.props.paymentReceipts
                }));
            }

            this.props.filterReceiptsList(this.state.label, this.props.paymentReceipts);
        }
    }

    render() {
        if (!this.props.authenticated) {
            return <Redirect to="/" />;
        }

        if (this.props.loading) {
            return <Loader loading={this.props.loading} />;
        } else {
            return (
                <>
                    <PaymentReceiptsListTable />
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
)(PaymentReceiptsList);
