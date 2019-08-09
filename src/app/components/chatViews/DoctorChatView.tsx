import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ChatSideNav from "./ChatSideNav";
import { ChatCaseDetails } from "./ChatCaseDetails";
import { ChatMessage } from "./ChatMessage";
import { PatientDetailsPanel } from "./PatientDetailsPanel";
import { PatientHistoryPanel } from "./PatientHistoryPanel";
import * as actions from "./chatCaseActions";
import { reduxForm, Field } from "redux-form";
import TextAreaRegular from "../../form/TextAreaRegular";
import TransferCaseDoctorModal from "../transferCase/TransferCaseModal";
import QuestionTemplateModal from "../questionTemplate/QuestionTemplateModal";
import HistoryAccessModal from "./historyAccess/HistoryAccessModal";
import HistoryCaseModal from "./historyCase/HistoryCaseModal";
import transferImage from "../../assets/images/transfer.png";
// import historyLock from '../../assets/images/lock.png'
import formImage from "../../assets/images/form.png";
import ScrollToBottom from "../../util/ScrollToBottom";

class DoctorChatView extends Component {
    state = {
        caseChatData: [],
        casePatient: {},
        patientHistory: [],
        caseQuestionToAnswer: {},
        openHistoryAccessModal: false,
        openTransferCaseDoctorModal: false,
        openQuestionTemplateModal: false,
        openHistoryCaseModal: false,
        requestStatus: undefined,
        accessLevel: undefined,
        historyCases: [],
        historyCase: undefined,
        waitingApproval: false,
        allAccessRequests: [],
        whichButton: "both",
        allChatMessages: [],
        sidebarActive: "",
        detailsActive: "",
        questionsOrHistoryActive: ""
    };

    componentDidMount() {
        this.props.getChatCaseReplies(this.props.chatCase.id, this.props.chatCase, "doctor", true);

        // this.setState(() => ({
        //   caseChatData: this.props.caseChatData,
        //   casePatient: this.props.casePatient,
        //   requestStatus: this.props.requestStatus,
        //   accessLevel: this.props.accessLevel,
        //   historyCases: this.props.historyCases,
        //   waitingApproval: this.props.waitingApproval
        // }))

        this.props.getHistoryAccessRequestStatus(
            this.props.chatCase.id,
            this.props.signedInUser,
            this.props.chatCase.patient.id,
            this.props.chatCase.speciality.parent_id === 0
                ? this.props.chatCase.speciality.id
                : this.props.chatCase.speciality.parent_id
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.caseChatData !== this.props.caseChatData) {
            this.setState(() => ({
                caseChatData: this.props.caseChatData
            }));
        }
        if (prevProps.casePatient !== this.props.casePatient) {
            this.setState(() => ({
                casePatient: this.props.casePatient
            }));
        }
        if (prevProps.requestStatus !== this.props.requestStatus) {
            this.setState(() => ({
                requestStatus: this.props.requestStatus
            }));
        }
        if (prevProps.accessLevel !== this.props.accessLevel) {
            this.setState(() => ({
                accessLevel: this.props.accessLevel
            }));
        }
        if (prevProps.historyCases !== this.props.historyCases) {
            this.setState(() => ({
                historyCases: this.props.historyCases
            }));
        }
        if (prevProps.waitingApproval !== this.props.waitingApproval) {
            this.setState(() => ({
                waitingApproval: this.props.waitingApproval
            }));
        }
        if (prevProps.allAccessRequests !== this.props.allAccessRequests) {
            this.setState(() => ({
                allAccessRequests: this.props.allAccessRequests
            }));
        }
        if (
            this.state.caseChatData.length !== 0 &&
            this.state.allChatMessages.length !==
                this.state.caseChatData.length + this.state.allAccessRequests.length
        ) {
            this.setState(() => ({
                allChatMessages: [...this.props.caseChatData, ...this.props.allAccessRequests].sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                )
            }));
        }
    }

    togglePatientDetails = e => {
        e.preventDefault();
        if (this.state.detailsActive === "active")
            this.setState(() => ({
                detailsActive: "",
                sidebarActive: ""
            }));
        else
            this.setState(() => ({
                detailsActive: "active",
                sidebarActive: "sidebar-active"
            }));
        this.setState(() => ({
            questionsOrHistoryActive: ""
        }));
    };

    togglePatientHistory = e => {
        e.preventDefault();
        if (this.state.questionsOrHistoryActive === "active")
            this.setState(() => ({
                questionsOrHistoryActive: "",
                sidebarActive: ""
            }));
        else
            this.setState(() => ({
                questionsOrHistoryActive: "active",
                sidebarActive: "sidebar-active"
            }));
        this.setState(() => ({
            detailsActive: ""
        }));
    };

    handleFormSubmit = values => {
        this.props.handleSubmitChatReply(
            this.props.chatCase,
            {
                case_id: this.props.chatCase.id,
                reply: values.chat_reply
            },
            this.props.signedInUser.type
        );

        this.props.reset();
    };

    handleOpenTransferCaseModal = () => {
        this.setState(() => ({
            openTransferCaseDoctorModal: true
        }));
    };

    handleCloseTransferCaseModal = () => {
        this.setState(() => ({
            openTransferCaseDoctorModal: false
        }));
    };

    handleOpenQuestionTemplateModal = () => {
        this.setState(() => ({
            openQuestionTemplateModal: true
        }));
    };

    handleCloseQuestionTemplateModal = () => {
        this.setState(() => ({
            openQuestionTemplateModal: false
        }));
    };

    handleOpenHistoryAccessModal = whichButton => {
        this.setState(() => ({
            openHistoryAccessModal: true,
            whichButton: whichButton
        }));
    };

    handleCloseHistoryAccessModal = () => {
        this.setState(() => ({
            openHistoryAccessModal: false
        }));
    };

    handleOpenHistoryCaseModal = () => {
        this.setState(() => ({
            openHistoryCaseModal: true
        }));
    };

    handleCloseHistoryCaseModal = () => {
        this.setState(() => ({
            openHistoryCaseModal: false
        }));
    };

    requestStatusUpdate = () => {
        this.setState(() => ({
            waitingApproval: true
        }));
    };

    handleHistoryCaseClick = (e, historyCaseClicked) => {
        e.preventDefault();
        this.setState(() => ({
            historyCase: historyCaseClicked
        }));
        this.handleOpenHistoryCaseModal();
    };

    handleDeleteTransferRequest = (transferId: number) => {
        this.props.deleteTransferRequest(this.props.chatCase, transferId);
    };

    render() {
        const { sidebarActive, detailsActive, questionsOrHistoryActive } = this.state;

        return (
            <>
                <HistoryAccessModal
                    openHistoryAccessModal={this.state.openHistoryAccessModal}
                    closeHistoryAccessModal={this.handleCloseHistoryAccessModal}
                    requestStatusUpdate={this.requestStatusUpdate}
                    caseId={this.props.chatCase.id}
                    whichButton={this.state.whichButton}
                />
                <TransferCaseDoctorModal
                    openTransferCaseDoctorModal={this.state.openTransferCaseDoctorModal}
                    closeTransferCaseDoctorModal={this.handleCloseTransferCaseModal}
                    transferCase={this.props.chatCase}
                />
                <QuestionTemplateModal
                    openQuestionTemplateModal={this.state.openQuestionTemplateModal}
                    closeQuestionTemplateModal={this.handleCloseQuestionTemplateModal}
                    caseId={this.props.chatCase.id}
                />
                <HistoryCaseModal
                    openHistoryCaseModal={this.state.openHistoryCaseModal}
                    closeHistoryCaseModal={this.handleCloseHistoryCaseModal}
                    historyCase={this.state.historyCase}
                />
                <div className="action-bar chat">
                    <div className="actions left">
                        <div className="single">
                            <button onClick={this.handleOpenTransferCaseModal} className="btn">
                                تحويل الحالة
                                <span>
                                    <img src={transferImage} alt="تحويل الحالة" />
                                </span>
                            </button>
                        </div>
                        {/* <div className='single'>
              <button
                className='btn'
              >
                طلب الاطلاع على الأسئلة السابقة
                <span><img src={historyLock} alt='طلب الاطلاع على الأسئلة السابقة' /></span>
              </button>
            </div> */}
                        <div className="single">
                            <button onClick={this.handleOpenQuestionTemplateModal} className="btn">
                                إنشاء / إرسال نموذج أسئلة
                                <span>
                                    <img src={formImage} alt="إنشاء / إرسال نموذج أسئلة" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`container chat sidebar ${sidebarActive}`}>
                    <div className="chat-view">
                        <ScrollToBottom>
                            <div className="messages" id="messages">
                                {this.state.allChatMessages.map(message => (
                                    <div key={message.id + (message.status ? message.status : 0)}>
                                        <ChatMessage
                                            message={message}
                                            me="doctor"
                                            userId={this.props.signedInUser.id}
                                            // handleDeleteTransferRequest={this.handleDeleteTransferRequest}
                                        />
                                    </div>
                                ))}
                                {this.props.chatCase.status === "Closed" ? (
                                    <ChatMessage
                                        message={{ type: "Closed" }}
                                        updated_at={this.props.chatCase.updated_at}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </ScrollToBottom>
                        <div className="new-message">
                            {this.props.chatCase.status !== "Closed" ? (
                                <form
                                    id="chatReplyForm"
                                    onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
                                >
                                    <Field
                                        name="chat_reply"
                                        type="text"
                                        component={TextAreaRegular}
                                        placeholder="اكتب رسالتك هنا..."
                                    />
                                    <div className="chat-actions">
                                        <button className="btn" type="submit">
                                            إرسال
                                        </button>
                                        <button className="btn" type="reset">
                                            إلغاء
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <aside>
                    <ChatSideNav
                        toggleDetails={this.togglePatientDetails}
                        toggleQuestionsOrHistory={this.togglePatientHistory}
                        detailsActive={detailsActive}
                        questionsOrHistoryActive={questionsOrHistoryActive}
                        removeNote={true}
                    />
                    <ChatCaseDetails chatCase={this.props.chatCase} />
                    <PatientDetailsPanel
                        patient={this.state.casePatient}
                        detailsActive={detailsActive}
                    />
                    <PatientHistoryPanel
                        caseIsClosed={this.props.chatCase.status === "Closed"}
                        openHistoryAccessModal={this.handleOpenHistoryAccessModal}
                        requestStatus={this.state.requestStatus}
                        accessLevel={this.state.accessLevel}
                        historyCases={this.state.historyCases}
                        handleHistoryCaseClick={this.handleHistoryCaseClick}
                        waitingApproval={this.state.waitingApproval}
                        questionsOrHistoryActive={questionsOrHistoryActive}
                    />
                </aside>
            </>
        );
    }
}

const mapState = state => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    caseChatData: state.chatCase.caseChatData,
    casePatient: state.chatCase.casePatient,
    caseUnansweredQuestions: state.chatCase.caseUnansweredQuestions,
    requestStatus: state.historyAccess.requestStatus,
    accessLevel: state.historyAccess.accessLevel,
    historyCases: state.historyAccess.historyCases,
    waitingApproval: state.historyAccess.waitingApproval,
    allAccessRequests: state.historyAccess.allAccessRequests
});

const validate = values => {
    const errors = {};
    // if (!values.chat_reply) {
    //   console.log('EMPTY chat_reply')
    //   errors.chat_reply = 'I AM EMPTY!'
    // }
    return errors;
};

export default compose(
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "chatReplyForm", enableReinitialize: true, validate })
)(DoctorChatView);
