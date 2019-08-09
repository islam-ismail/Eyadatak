import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ChatSideNav from "./ChatSideNav";
import { ChatCaseDetails } from "./ChatCaseDetails";
import { ChatMessage } from "./ChatMessage";
import { DoctorDetailsPanel } from "./DoctorDetailsPanel";
import CaseQuestionsPanel from "./CaseQuestionsPanel";
import * as actions from "./chatCaseActions";
import { reduxForm, Field } from "redux-form";
import TextAreaRegular from "../../form/TextAreaRegular";
import ScrollToBottom from "../../util/ScrollToBottom";

class PatientChatView extends Component {
    state = {
        caseChatData: [],
        caseDoctor: {},
        caseUnansweredQuestions: [],
        caseQuestionToAnswer: {},
        requestStatus: undefined,
        accessLevel: undefined,
        historyAccessId: undefined,
        waitingApproval: false,
        waitingLevel: undefined,
        allAccessRequests: [],
        allChatMessages: [],
        sidebarActive: "",
        detailsActive: "",
        questionsOrHistoryActive: "",
        requestRespondedTo: false
    };

    componentDidMount() {
        this.setState(() => ({
            caseChatData: this.props.caseChatData,
            caseDoctor: this.props.caseDoctor,
            caseUnansweredQuestions: this.props.caseUnansweredQuestions,
            requestStatus: this.props.requestStatus,
            accessLevel: this.props.accessLevel,
            historyAccessId: this.props.historyAccessId,
            waitingApproval: this.props.waitingApproval,
            waitingLevel: this.props.waitingLevel,
            allChatMessages: [],
            requestRespondedTo: false
        }));

        this.props.getChatCaseReplies(this.props.chatCase.id, this.props.chatCase, "patient", true);
        this.props.getHistoryAccessRequestStatus(
            this.props.chatCase.id,
            this.props.signedInUser,
            this.props.signedInUser.id,
            this.props.chatCase.speciality_id
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.caseChatData !== this.props.caseChatData) {
            this.setState(() => ({
                caseChatData: this.props.caseChatData,
                allChatMessages: [...this.props.caseChatData, ...this.props.allAccessRequests].sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                )
            }));
        }
        if (prevProps.caseDoctor !== this.props.caseDoctor) {
            this.setState(() => ({
                caseDoctor: this.props.caseDoctor
            }));
        }
        if (prevProps.caseUnansweredQuestions !== this.props.caseUnansweredQuestions) {
            this.setState(() => ({
                caseUnansweredQuestions: this.props.caseUnansweredQuestions
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
        if (prevProps.historyAccessId !== this.props.historyAccessId) {
            this.setState(() => ({
                historyAccessId: this.props.historyAccessId
            }));
        }
        if (prevProps.waitingApproval !== this.props.waitingApproval) {
            this.setState(() => ({
                waitingApproval: this.props.waitingApproval
            }));
        }
        if (prevProps.waitingLevel !== this.props.waitingLevel) {
            this.setState(() => ({
                waitingLevel: this.props.waitingLevel
            }));
        }
        if (prevProps.allAccessRequests !== this.props.allAccessRequests) {
            this.setState(() => ({
                allAccessRequests: this.props.allAccessRequests,
                allChatMessages: [...this.props.caseChatData, ...this.props.allAccessRequests].sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                )
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

    toggleDoctorDetails = e => {
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

    toggleCaseQuestions = e => {
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
            { case_id: this.props.chatCase.id, reply: values.chat_reply },
            this.props.signedInUser.type
        );

        this.props.reset();
    };

    handleAccessRequestResponse = (requestResponse, accessLevel = undefined) => {
        this.props.respondToHistoryAccessRequest(
            this.state.historyAccessId,
            requestResponse,
            accessLevel,
            this.props.chatCase.id,
            this.props.signedInUser,
            this.props.signedInUser.id,
            this.props.chatCase.speciality_id
        );
        this.setState(() => ({
            requestRespondedTo: true
        }));
    };

    render() {
        const { sidebarActive, detailsActive, questionsOrHistoryActive } = this.state;
        return (
            <>
                <div className="action-bar chat" />
                <div className={`container chat sidebar ${sidebarActive}`}>
                    <div className="chat-view">
                        <ScrollToBottom>
                            <div className="messages" id="messages">
                                {this.state.allChatMessages.map(message => (
                                    <div key={message.id + (message.status ? message.status : 0)}>
                                        <ChatMessage
                                            message={message}
                                            openQuestionPanel={this.toggleCaseQuestions}
                                            waitingLevel={this.state.waitingLevel}
                                            handleAccessRequestResponse={
                                                this.handleAccessRequestResponse
                                            }
                                            requestRespondedTo={this.state.requestRespondedTo}
                                            me="patient"
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
                        toggleDetails={this.toggleDoctorDetails}
                        toggleQuestionsOrHistory={this.toggleCaseQuestions}
                        detailsActive={detailsActive}
                        questionsOrHistoryActive={questionsOrHistoryActive}
                        removeNote={
                            this.state.caseUnansweredQuestions &&
                            this.state.caseUnansweredQuestions.length !== 0
                        }
                    />
                    <ChatCaseDetails chatCase={this.props.chatCase} />
                    <DoctorDetailsPanel
                        doctor={this.state.caseDoctor}
                        detailsActive={detailsActive}
                    />
                    <CaseQuestionsPanel
                        caseUnansweredQuestions={this.state.caseUnansweredQuestions}
                        caseId={this.props.chatCase.id}
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
    caseDoctor: state.chatCase.caseDoctor,
    caseUnansweredQuestions: state.chatCase.caseUnansweredQuestions,
    requestStatus: state.historyAccess.requestStatus,
    accessLevel: state.historyAccess.accessLevel,
    historyAccessId: state.historyAccess.historyAccessId,
    waitingApproval: state.historyAccess.waitingApproval,
    waitingLevel: state.historyAccess.waitingLevel,
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
)(PatientChatView);
