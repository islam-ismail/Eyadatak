import React, { Component, ComponentType, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { AppState } from "../../reducers/rootReducer";
import * as actions from "../auth/authActions";
import { AuthActionsSignatures } from "../auth/authTypes";
import PaymentReceiptsList from "./PaymentReceiptsList";
import ChargeWalletModal from "../payment/ChargeWalletModal";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    authenticated: state.auth.authenticated,
    signedInUser: state.auth.signedInUser
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = AuthActionsSignatures;

type CompProps = CompStateProps & CompActionProps;

interface CompState {
    openChargeWalletModal: boolean;
}

class UserWallet extends Component<CompProps, CompState> {
    state: CompState = {
        openChargeWalletModal: false
    };

    handleOpenModal: MouseEventHandler = e => {
        this.setState(() => ({
            openChargeWalletModal: true
        }));
    };

    handleCloseModal: MouseEventHandler = e => {
        this.setState(() => ({
            openChargeWalletModal: false
        }));
    };
    render() {
        const { authenticated, signedInUser } = this.props;
        const { openChargeWalletModal } = this.state;

        if (!authenticated) {
            return <Redirect to="/" />;
        }

        return signedInUser ? (
            <>
                <ChargeWalletModal
                    openChargeWalletModal={openChargeWalletModal}
                    closeChargeWalletModal={this.handleCloseModal}
                />
                <div className="container">
                    <div className="wallet-info">
                        <h3>شحن أو إضافة رصيد للمحفظة الإلكترونية</h3>
                        <b>الرصيد الحالي: {signedInUser.patient_wallet.balance} ج.م.</b>

                        <button onClick={this.handleOpenModal} className="btn btn-success">
                            شحن المحفظة
                        </button>
                    </div>
                    <div className="payment-receipts-list">
                        <PaymentReceiptsList />
                    </div>
                </div>
            </>
        ) : (
            <></>
        );
    }
}

export default compose<ComponentType>(
    connect(
        mapState,
        actions
    )
)(UserWallet);
