import React, { Component, ComponentType, MouseEventHandler, ChangeEventHandler } from "react";
import Modal from "react-modal";
import { compose } from "redux";
import { connect } from "react-redux";
import Button from "../../UIComponents/Button";
import Loader from "../layout/Loader";
import { AppState } from "../../reducers/rootReducer";
import ChargeWalletForm from "./ChargeWalletForm";
import { toast } from "react-toastify";
import Axios from "axios";
import {
    Api_PaymentChargeWallet_Payload,
    Api_PaymentChargeWallet_Endpoint,
    Api_PaymentChargeWallet_Response
} from "../../types/api-endpoints/payment";

const mapState = (state: AppState) => ({
    loading: state.global.loading,
    newToBePaidCase: state.newCase.newToBePaidCase
});

type CompStateProps = ReturnType<typeof mapState>;

interface CompOwnProps {
    openChargeWalletModal: boolean;
    closeChargeWalletModal: MouseEventHandler;
}

type CompProps = CompOwnProps & CompStateProps;

interface CompState {
    paymentMethodType?: "Accept" | "Fawry";
    fawryReferenceNumber?: string;
    done: boolean;
    amountToBePaid: number;
}

class ChargeWalletModal extends Component<CompProps, CompState> {
    state: CompState = {
        done: false,
        paymentMethodType: "Accept",
        amountToBePaid: 0
    };

    handleSubmit: MouseEventHandler = e => {
        e.preventDefault();
        const { paymentMethodType, amountToBePaid } = this.state;
        try {
            const payload: Api_PaymentChargeWallet_Payload = {
                payment_method_type: paymentMethodType,
                amount: amountToBePaid
            };
            Axios.post(Api_PaymentChargeWallet_Endpoint(), payload).then(response => {
                const responseData: Api_PaymentChargeWallet_Response = response.data;

                if (responseData.status === false || !responseData.data) {
                    throw new Error(responseData.error_message);
                }

                if (paymentMethodType === "Accept") {
                    window.location.href = responseData.data.iframe_url;
                } else if (paymentMethodType === "Fawry") {
                    this.setState({
                        fawryReferenceNumber: responseData.data.referenceNumber as string
                    });
                }
            });

            this.setState({ done: true });
        } catch (error) {
            console.log("error:", error);

            if (error.response) {
                if (error.response.data.error_message) {
                    toast.error(error.response.data.error_message);
                }
            } else {
                toast.error(error.message);
            }
        }
    };

    amountToBePaidHandler: ChangeEventHandler<HTMLInputElement> = e => {
        this.setState({ amountToBePaid: parseInt(e.target.value, 10) });
    };

    changePaymentMethodType: ChangeEventHandler = e => {
        let paymentMethodType: "Accept" | "Fawry" = "Accept";

        if (e.currentTarget.getAttribute("data-value") === "Fawry") {
            paymentMethodType = "Fawry";
        }

        this.setState({ paymentMethodType });
    };

    render() {
        const { openChargeWalletModal, closeChargeWalletModal, loading } = this.props;
        const { paymentMethodType, fawryReferenceNumber, done } = this.state;

        return (
            <>
                <Modal
                    isOpen={openChargeWalletModal}
                    className="react-modal new-case-modal modal"
                    overlayClassName="react-modal-overlay"
                    portalClassName="react-modal-portal"
                    contentLabel="Create New Case Modal"
                    onRequestClose={closeChargeWalletModal}
                    closeTimeoutMS={300}
                >
                    <div className="modal-content-wrapper content">
                        <Loader loading={loading} />

                        <div className="modal-header header">
                            <Button
                                icon="icon"
                                title="Close Modal"
                                onClick={closeChargeWalletModal}
                                extraclasses="close-modal"
                            >
                                <i className="f-icon close-icon" />
                            </Button>
                            {/* <h3>Ask New Question</h3>
                            <p className="note">
                                Please fill the fields below so that the expert can help you in the
                                best way possible.
                            </p> */}
                        </div>

                        <div className="modal-body body">
                            <ChargeWalletForm
                                paymentMethodType={paymentMethodType}
                                done={done}
                                fawryReferenceNumber={fawryReferenceNumber}
                                changePaymentMethodType={this.changePaymentMethodType}
                                amountToBePaidHandler={this.amountToBePaidHandler}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

export default compose<ComponentType<CompOwnProps>>(connect(mapState))(ChargeWalletModal);
