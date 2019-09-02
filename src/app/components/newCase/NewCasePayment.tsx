import React, { Component, ComponentType, FormEventHandler, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppState } from "../../reducers/rootReducer";
import Button from "../../UIComponents/Button";
import { toast } from "react-toastify";
import {
    Api_PaymentMedicalCasePaymentMethod_Payload,
    Api_PaymentMedicalCasePaymentMethod_Endpoint,
    Api_PaymentMedicalCasePaymentMethod_Response,
    Api_PaymentMedicalCaseWallet_Endpoint,
    Api_PaymentMedicalCaseWallet_Response
} from "../../types/api-endpoints/payment";
import Axios from "axios";
import * as myCasesListActions from "../myCasesList/myCasesListActions";
import * as newCaseActions from "./newCaseActions";
import { MyCasesListActionsSignatures } from "../myCasesList/myCasesListTypes";
import { NewCaseActionsSignatures } from "./newCaseTypes";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    newToBePaidCase: state.newCase.newToBePaidCase
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = MyCasesListActionsSignatures & NewCaseActionsSignatures;

type CompProps = CompStateProps & CompActionProps;

interface CompState {
    paymentSource: "Payment method" | "Wallet";
    paymentMethodType?: "Accept" | "Fawry";
    done: boolean;
    fawryReferenceNumber?: string;
}

class NewCasePayment extends Component<CompProps, CompState> {
    componentDidMount() {
        toast.dismiss();
    }

    state: CompState = {
        paymentSource: "Payment method",
        done: false
    };

    handleSubmit: FormEventHandler = e => {
        e.preventDefault();
        const { paymentMethodType, paymentSource } = this.state;
        const { newToBePaidCase } = this.props;
        if (newToBePaidCase) {
            try {
                if (paymentSource === "Payment method") {
                    const payload: Api_PaymentMedicalCasePaymentMethod_Payload = {
                        payment_method_type: paymentMethodType
                    };
                    Axios.post(
                        Api_PaymentMedicalCasePaymentMethod_Endpoint(newToBePaidCase.id),
                        payload
                    ).then(response => {
                        const responseData: Api_PaymentMedicalCasePaymentMethod_Response =
                            response.data;

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
                } else if (paymentSource === "Wallet") {
                    Axios.post(Api_PaymentMedicalCaseWallet_Endpoint(newToBePaidCase.id)).then(
                        response => {
                            const responseData: Api_PaymentMedicalCaseWallet_Response =
                                response.data;

                            if (responseData.status === false || !responseData.data) {
                                throw new Error(responseData.error_message);
                            }

                            this.props.updateCaseInMyList(responseData.data.medical_case);

                            toast.success(responseData.success_message);
                        }
                    );
                }

                this.setState({ done: true });
            } catch (error) {
                console.log("error:", error);

                if (error.response) {
                    toast.error(error.response.data.error_message);
                } else {
                    toast.error(error.message);
                }
            }
        }
    };

    changePaymentSource: MouseEventHandler = e => {
        let paymentSource: "Payment method" | "Wallet" = "Payment method";

        if (e.currentTarget.getAttribute("data-value") === "Wallet") {
            paymentSource = "Wallet";
        }

        this.setState({ paymentSource });
    };

    changePaymentMethodType: MouseEventHandler = e => {
        let paymentMethodType: "Accept" | "Fawry" = "Accept";

        if (e.currentTarget.getAttribute("data-value") === "Fawry") {
            paymentMethodType = "Fawry";
        }

        this.setState({ paymentMethodType });
    };

    render() {
        const { paymentSource, paymentMethodType, done, fawryReferenceNumber } = this.state;

        return (
            <>
                <div id="payment-summary"></div>
                <div id="payment-form">
                    {done ? (
                        fawryReferenceNumber ? (
                            <p>Fawry reference number: {fawryReferenceNumber}</p>
                        ) : (
                            <></>
                        )
                    ) : (
                        <form onSubmit={this.handleSubmit}>
                            <div
                                id="payment-source"
                                className="col-md-12 list-group list-group-horizontal"
                            >
                                <button
                                    type="button"
                                    data-value="Wallet"
                                    onClick={this.changePaymentSource}
                                    className={
                                        "col-md-6 btn list-group-item list-group-item-action" +
                                        (paymentSource === "Wallet" ? " active" : "")
                                    }
                                >
                                    Wallet
                                </button>
                                <button
                                    type="button"
                                    data-value="Payment method"
                                    onClick={this.changePaymentSource}
                                    className={
                                        "col-md-6 btn list-group-item list-group-item-action" +
                                        (paymentSource === "Payment method" ? " active" : "")
                                    }
                                >
                                    Payment method
                                </button>
                            </div>
                            {paymentSource === "Payment method" && (
                                <div
                                    id="payment-method-type"
                                    className="col-md-12 list-group list-group-horizontal"
                                >
                                    <button
                                        type="button"
                                        data-value="Fawry"
                                        onClick={this.changePaymentMethodType}
                                        className={
                                            "col-md-6 btn list-group-item list-group-item-action" +
                                            (paymentMethodType === "Fawry" ? " active" : "")
                                        }
                                    >
                                        Fawry
                                    </button>
                                    <button
                                        type="button"
                                        data-value="Accept"
                                        onClick={this.changePaymentMethodType}
                                        className={
                                            "col-md-6 btn list-group-item list-group-item-action" +
                                            (paymentMethodType === "Accept" ? " active" : "")
                                        }
                                    >
                                        Accept
                                    </button>
                                </div>
                            )}
                            <Button type="submit" size="big" theme="black">
                                دفع
                            </Button>
                        </form>
                    )}
                </div>
            </>
        );
    }
}

const dispatchProps = {
    ...myCasesListActions,
    ...newCaseActions
};

export default compose<ComponentType>(
    connect(
        mapState,
        dispatchProps
    )
)(NewCasePayment);
