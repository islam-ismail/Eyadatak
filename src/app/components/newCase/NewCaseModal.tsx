import React, { Component, ComponentType, MouseEventHandler } from "react";
import Modal from "react-modal";
import { compose } from "redux";
import { connect } from "react-redux";
import NewCaseForm from "./NewCaseForm";
import Button from "../../UIComponents/Button";
import Loader from "../layout/Loader";
import * as globalStateActions from "../globalState/globalStateActions";
import { AppState } from "../../reducers/rootReducer";
import { GlobalStateActionSignatures } from "../globalState/globalStateTypes";
import NewCasePayment from "./NewCasePayment";
import * as newCaseActions from "./newCaseActions";
import { NewCaseActionsSignatures } from "./newCaseTypes";

const mapState = (state: AppState) => ({
    loading: state.global.loading,
    newToBePaidCase: state.newCase.newToBePaidCase
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = GlobalStateActionSignatures & NewCaseActionsSignatures;
interface CompOwnProps {
    openNewCaseModal: boolean;
    closeNewCaseModal: MouseEventHandler;
}

type CompProps = CompOwnProps & CompStateProps & CompActionProps;

class NewCaseModal extends Component<CompProps> {
    componentWillUnmount() {
        this.props.removeNewToBePaidCase();
    }

    render() {
        const { openNewCaseModal, closeNewCaseModal, loading, newToBePaidCase } = this.props;

        return (
            <>
                <Modal
                    isOpen={openNewCaseModal}
                    className="react-modal new-case-modal"
                    overlayClassName="react-modal-overlay"
                    portalClassName="react-modal-portal"
                    contentLabel="Create New Case Modal"
                    onRequestClose={closeNewCaseModal}
                    closeTimeoutMS={300}
                >
                    <div className="modal-content-wrapper">
                        <Loader loading={loading} />

                        <div className="modal-header">
                            <Button
                                icon="icon"
                                title="Close Modal"
                                onClick={closeNewCaseModal}
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

                        <div className="modal-body">
                            {newToBePaidCase ? <NewCasePayment /> : <NewCaseForm />}
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const dispatchProps = {
    ...globalStateActions,
    ...newCaseActions
};

export default compose<ComponentType<CompOwnProps>>(
    connect(
        mapState,
        dispatchProps
    )
)(NewCaseModal);
