import React, { Component, ComponentType, MouseEventHandler, ChangeEventHandler } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppState } from "../../reducers/rootReducer";
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
import PaymentForm from "../payment/PaymentForm";

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

    handleSubmit: MouseEventHandler = e => {
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
                    if (error.response.data.error_message) {
                        toast.error(error.response.data.error_message);
                    }
                } else {
                    toast.error(error.message);
                }
            }
        }
    };

    changePaymentSource: ChangeEventHandler = e => {
        let paymentSource: "Payment method" | "Wallet" = "Payment method";

        if (e.currentTarget.getAttribute("data-value") === "Wallet") {
            paymentSource = "Wallet";
        }

        this.setState({ paymentSource });
    };

    changePaymentMethodType: ChangeEventHandler = e => {
        let paymentMethodType: "Accept" | "Fawry" = "Accept";

        if (e.currentTarget.getAttribute("data-value") === "Fawry") {
            paymentMethodType = "Fawry";
        }

        this.setState({ paymentMethodType });
    };

    render() {
        const { paymentSource, paymentMethodType, done, fawryReferenceNumber } = this.state;
        const { newToBePaidCase, signedInUser } = this.props;

        return signedInUser && newToBePaidCase ? (
            <PaymentForm
                paymentSource={paymentSource}
                paymentMethodType={paymentMethodType}
                done={done}
                amount={newToBePaidCase.speciality.fee}
                walletBalance={signedInUser.patient_wallet.balance}
                fawryReferenceNumber={fawryReferenceNumber}
                changePaymentMethodType={this.changePaymentMethodType}
                changePaymentSource={this.changePaymentSource}
                handleSubmit={this.handleSubmit}
            />
        ) : (
            <></>
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
