import React, { Component } from "react";
import Modal from "react-modal";
import { compose } from "redux";
import { connect } from "react-redux";
import Button from "../../../UIComponents/Button";
import Loader from "../../layout/Loader";
import * as actions from "./historyAccessActions";

class HistoryAccessModal extends Component {
    state = {
        histroyAccessRequested: false
    };

    handleAccessRequest = (accessLevel: string) => {
        this.props.requestHistoryAccess(accessLevel, this.props.caseId);
        this.setState(() => ({
            histroyAccessRequested: true
        }));
        this.props.requestStatusUpdate();
    };

    render() {
        const {
            openHistoryAccessModal,
            closeHistoryAccessModal,
            whichButton,
            loading
        } = this.props;

        const { histroyAccessRequested } = this.state;

        return (
            <>
                <Modal
                    isOpen={openHistoryAccessModal}
                    className="react-modal history-access-modal"
                    overlayClassName="react-modal-overlay"
                    portalClassName="react-modal-portal"
                    contentLabel="Request History Access Modal"
                    onRequestClose={closeHistoryAccessModal}
                    closeTimeoutMS={300}
                >
                    <div className="modal-content-wrapper">
                        <Loader loading={loading} />

                        <div className="modal-header">
                            <Button
                                icon="icon"
                                title="Close Modal"
                                onClick={closeHistoryAccessModal}
                                extraclasses="close-modal"
                            >
                                <i className="f-icon close-icon" />
                            </Button>
                            <h3>Request History Access from Patient</h3>
                        </div>

                        <div className="modal-body">
                            {!histroyAccessRequested ? (
                                <>
                                    <Button
                                        type="submit"
                                        size="big"
                                        theme="black"
                                        onClick={() => this.handleAccessRequest("All")}
                                    >
                                        Request Full Access
                                    </Button>
                                    <br />
                                    {whichButton === "both" ? (
                                        <>
                                            <br />
                                            <Button
                                                type="submit"
                                                size="big"
                                                theme="black"
                                                onClick={() =>
                                                    this.handleAccessRequest("Speciality")
                                                }
                                            >
                                                Request Access to Speciality Cases
                                            </Button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <>
                                    Access Request Sent to Patient!
                                    <Button
                                        type="submit"
                                        size="big"
                                        theme="black"
                                        onClick={closeHistoryAccessModal}
                                    >
                                        Close this window!
                                    </Button>
                                </>
                            )}
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
)(HistoryAccessModal);
