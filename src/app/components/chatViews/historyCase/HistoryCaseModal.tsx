import React, { Component, ComponentType, EventHandler, MouseEvent } from "react";
// import Modal from 'react-modal'
import { compose } from "redux";
import { connect } from "react-redux";
// import Loader from '../../layout/Loader'
import { HistoryChatMessage } from "./HistoryChatMessage";
import * as actions from "./historyCaseActions";
import { adjustDateZone } from "../../../util/helpersFunc";
import { AppState } from "../../../reducers/rootReducer";
import { HistoryCaseSignatures } from "./historyCaseTypes";
import { CaseChatElement } from "../chatCaseTypes";
import { MedicalCase } from "../../../types/models/MedicalCase";

const mapState = (state: AppState) => ({
    loading: state.global.loading,
    historyCaseChatData: state.historyCase.historyCaseChatData
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = HistoryCaseSignatures;

interface CompOwnProps {
    openHistoryCaseModal: boolean;
    closeHistoryCaseModal: EventHandler<MouseEvent>;
    historyCase: MedicalCase;
}

type CompProps = CompOwnProps & CompStateProps & CompActionProps;

interface CompState {
    historyCase?: MedicalCase;
    historyCaseChatData: CaseChatElement[];
}

class HistoryCaseModal extends Component<CompProps, CompState> {
    state: CompState = {
        historyCaseChatData: []
    };

    componentDidUpdate(prevProps: CompProps) {
        if (prevProps.historyCase !== this.props.historyCase) {
            this.setState(() => ({
                historyCase: this.props.historyCase
            }));
            this.props.getHistoryCaseReplies(
                this.props.historyCase.id,
                this.props.historyCase,
                true
            );
        }
        if (prevProps.historyCaseChatData !== this.props.historyCaseChatData) {
            this.setState(() => ({
                historyCaseChatData: this.props.historyCaseChatData
            }));
        }
    }

    render() {
        const {
            openHistoryCaseModal,
            historyCase,
            closeHistoryCaseModal
            // loading
        } = this.props;

        const { historyCaseChatData } = this.state;

        return (
            <>
                {historyCase ? (
                    <>
                        {/* <Modal
              isOpen={openHistoryCaseModal}
              className='react-modal history-case-modal'
              overlayClassName='react-modal-overlay'
              portalClassName='react-modal-portal'
              contentLabel='Request History Access Modal'
              onRequestClose={closeHistoryCaseModal}
              closeTimeoutMS={300}
            > */}
                        {openHistoryCaseModal ? (
                            <>
                                <div className="modal-wrapper">
                                    {/* <Loader loading={loading} /> */}
                                    <div className="modal" id="case_history">
                                        <div className="close" onClick={closeHistoryCaseModal} />
                                        <div className="info-bar">
                                            <p>
                                                تاريخ بداية السؤال
                                                <span>
                                                    {adjustDateZone(historyCase.created_at)}
                                                </span>
                                            </p>
                                            <p>
                                                التخصص<span>{historyCase.speciality.title_ar}</span>
                                            </p>
                                            <p>
                                                الطبيب
                                                <span>
                                                    {historyCase.doctor && historyCase.doctor.name}
                                                </span>
                                            </p>
                                            <p>
                                                تاريخ إغلاق السؤال
                                                <span>
                                                    {adjustDateZone(historyCase.updated_at)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="content">
                                            <div className="body">
                                                <div className="messages">
                                                    {historyCaseChatData.map(message => (
                                                        <div key={message.id}>
                                                            <HistoryChatMessage
                                                                message={message}
                                                                me="doctor"
                                                            />
                                                        </div>
                                                    ))}
                                                    <HistoryChatMessage
                                                        message={{ type: "Closed" }}
                                                        updated_at={historyCase.updated_at}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        {/* </Modal> */}
                    </>
                ) : (
                    <></>
                )}
            </>
        );
    }
}

export default compose<ComponentType<CompOwnProps>>(
    connect(
        mapState,
        actions
    )
)(HistoryCaseModal);
