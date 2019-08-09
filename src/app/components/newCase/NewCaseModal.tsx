import React, { Component } from "react";
import Modal from "react-modal";
import { compose } from "redux";
import { connect } from "react-redux";
import NewCaseForm from "./NewCaseForm";
import Button from "../../UIComponents/Button";
import Loader from "../layout/Loader";
import * as actions from "../globalState/globalStateActions";

class NewCaseModal extends Component {
    render() {
        const { openNewCaseModal, closeNewCaseModal, loading } = this.props;

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
                            <h3>Ask New Question</h3>
                            <p className="note">
                                Please fill the fields below so that the expert can help you in the
                                best way possible.
                            </p>
                        </div>

                        <div className="modal-body">
                            <NewCaseForm />
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapState = state => ({
    loading: state.global.loading
});

export default compose(
    connect(
        mapState,
        actions
    )
)(NewCaseModal);
