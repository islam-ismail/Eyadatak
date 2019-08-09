import React, { Component } from "react";
import Modal from "react-modal";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, reset, Field } from "redux-form";
import Button from "../../UIComponents/Button";
import TextInputRegular from "../../form/TextInputRegular";
import RadioGroup from "../../form/RadioGroup";
import TextAreaRegular from "../../form/TextAreaRegular";
// import CheckboxGroup from '../../form/CheckboxGroup'
import DropzoneInput from "../../form/DropzoneInput";
import Loader from "../layout/Loader";
import * as actions from "./questionTemplateActions";

class QuestionTemplateModal extends Component {
    state = {
        savedQuestions: [],
        templateToSend: [],
        answerType: "",
        answerOptions: [],
        newQuestionText: "",
        newAnswerOption: "",
        anythingSelected: false
    };

    componentDidMount() {
        this.props.getSavedQuestionsList();
        this.setState(() => ({
            answerOptions: []
        }));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.savedQuestions !== this.props.savedQuestions) {
            this.setState(() => ({
                savedQuestions: this.props.savedQuestions
            }));
        }
        if (prevProps.templateToSend !== this.props.templateToSend) {
            this.setState(() => ({
                templateToSend: this.props.templateToSend
            }));
        }
    }

    handleRadioChange = (event, value) => {
        this.setState(() => ({
            answerType: value,
            answerOptions: [],
            newAnswerOption: "",
            anythingSelected: true
        }));
    };

    handleQuestionTextChange = e => {
        this.setState(() => ({
            newQuestionText: e.target.value
        }));
    };

    handleAnswerOptionsTextChange = e => {
        this.setState(() => ({
            newAnswerOption: e.target.value
        }));
    };

    addAnswerOption = () => {
        let tempNewAnswerOptions = this.state.answerOptions.slice();
        tempNewAnswerOptions.push(this.state.newAnswerOption);
        this.setState(() => ({
            answerOptions: tempNewAnswerOptions,
            newAnswerOption: ""
        }));
    };

    addToTemplate = (questionId: number) => {
        this.props.addQuestionToTemplate(
            this.state.savedQuestions.filter(savedQuestion => savedQuestion.id === questionId)[0]
        );
    };

    handleSendQuestionTemplate = () => {
        this.props.sendCaseTemplateQuestions(
            this.state.templateToSend.map(question => question.id),
            this.props.caseId
        );
    };

    saveAndAdd = () => {
        this.handleFormSubmit(true);
    };

    handleFormSubmit = (addNewQuestionToTemplate: boolean) => {
        this.props.saveNewQuestion(
            this.state.newQuestionText,
            this.state.answerType,
            this.state.answerOptions,
            addNewQuestionToTemplate
        );
        this.setState(() => ({
            newQuestionText: "",
            answerOptions: [],
            anythingSelected: false
        }));
        this.props.dispatch(reset("createNewQuestionForm"));
    };

    render() {
        const { openQuestionTemplateModal, closeQuestionTemplateModal, loading } = this.props;
        const { invalid, submitting, pristine } = this.props;
        const questionTypeOptions = [
            {
                key: 0,
                title: "TextInput",
                value: "TextInput"
            },
            {
                key: 1,
                title: "Textarea",
                value: "Textarea"
            },
            {
                key: 2,
                title: "RadioGroup",
                value: "RadioGroup"
            },
            {
                key: 3,
                title: "CheckboxInput",
                value: "CheckboxInput"
            },
            {
                key: 4,
                title: "FileInput",
                value: "FileInput"
            }
        ];

        return (
            <>
                <Modal
                    isOpen={openQuestionTemplateModal}
                    className="react-big-modal question-template-modal"
                    overlayClassName="react-modal-overlay"
                    portalClassName="react-modal-portal"
                    contentLabel="Questions Template Modal"
                    onRequestClose={closeQuestionTemplateModal}
                    closeTimeoutMS={300}
                >
                    <div className="modal-content-wrapper">
                        <Loader loading={loading} />

                        <div className="modal-header">
                            <Button
                                icon="icon"
                                title="Close Modal"
                                onClick={closeQuestionTemplateModal}
                                extraclasses="close-modal"
                            >
                                <i className="f-icon close-icon" />
                            </Button>
                            <h3>Send Question Template to Patient</h3>
                        </div>

                        <div className="modal-body">
                            <div className="half-modal-body-container">
                                <div className="half-modal-body">
                                    <div className="create-new-question">
                                        This is CREATE A NEW QUESTION part
                                    </div>
                                    <div>يرجى إدخال السؤال وتحديد طريقة الإجابة</div>
                                    <form
                                        onSubmit={this.props.handleSubmit(() =>
                                            this.handleFormSubmit(false)
                                        )}
                                    >
                                        <div>أدخل السؤال هنا</div>
                                        <Field
                                            key="newCreatedQuestionText"
                                            name="newCreatedQuestionText"
                                            required={true}
                                            type="text"
                                            component={TextInputRegular}
                                            onChange={this.handleQuestionTextChange}
                                            placeholder={this.state.newQuestionText}
                                        />
                                        <div>نوع الإجابة</div>
                                        <Field
                                            component={RadioGroup}
                                            name="answer-type"
                                            required={true}
                                            options={questionTypeOptions}
                                            onChange={this.handleRadioChange}
                                        />
                                        {this.state.anythingSelected &&
                                        this.state.answerType === "TextInput" ? (
                                            <>
                                                <div>شكل خانة الإجابة</div>
                                                <Field
                                                    key="question-text-input-answer"
                                                    name="question-text-input-answer"
                                                    required={false}
                                                    type="text"
                                                    component={TextInputRegular}
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {this.state.anythingSelected &&
                                        this.state.answerType === "Textarea" ? (
                                            <>
                                                <div>شكل خانة الإجابة</div>
                                                <Field
                                                    key="question-text-area-answer"
                                                    name="question-text-area-answer"
                                                    required={false}
                                                    type="text"
                                                    component={TextAreaRegular}
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {this.state.anythingSelected &&
                                        this.state.answerType === "RadioGroup" ? (
                                            <>
                                                <div>الاختيارات</div>
                                                {this.state.answerOptions.map(option => (
                                                    <div key={option} className="answer-option">
                                                        {option}
                                                    </div>
                                                ))}
                                                <Field
                                                    key="question-answer-option"
                                                    name="question-answer-option"
                                                    required={false}
                                                    type="text"
                                                    component={TextInputRegular}
                                                    onChange={this.handleAnswerOptionsTextChange}
                                                    placeholder={this.state.newAnswerOption}
                                                />
                                                <Button
                                                    size="small"
                                                    theme="grey"
                                                    onClick={this.addAnswerOption}
                                                >
                                                    Add Option
                                                </Button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {this.state.anythingSelected &&
                                        this.state.answerType === "CheckboxInput" ? (
                                            <>
                                                <div>الاختيارات</div>
                                                {this.state.answerOptions.map(option => (
                                                    <div key={option} className="answer-option">
                                                        {option}
                                                    </div>
                                                ))}
                                                <Field
                                                    key="question-answer-option"
                                                    name="question-answer-option"
                                                    required={false}
                                                    type="text"
                                                    component={TextInputRegular}
                                                    onChange={this.handleAnswerOptionsTextChange}
                                                    placeholder={this.state.newAnswerOption}
                                                />
                                                <Button
                                                    size="small"
                                                    theme="grey"
                                                    onClick={this.addAnswerOption}
                                                >
                                                    Add Option
                                                </Button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {this.state.anythingSelected &&
                                        this.state.answerType === "FileInput" ? (
                                            <>
                                                <Field
                                                    key="question-file-input-answer"
                                                    name="question-file-input-answer"
                                                    required={false}
                                                    type="file"
                                                    component={DropzoneInput}
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <Button
                                            disabled={invalid || submitting || pristine}
                                            size="small"
                                            theme="green"
                                            onClick={this.saveAndAdd}
                                        >
                                            Save &amp; Add to Template
                                        </Button>
                                        <Button
                                            disabled={invalid || submitting || pristine}
                                            type="submit"
                                            size="small"
                                            theme="blue"
                                        >
                                            Save
                                        </Button>
                                    </form>
                                    {this.state.savedQuestions.map(savedQuestion => (
                                        <div key={savedQuestion.id} className="saved-question">
                                            <div>Question: {savedQuestion.question_text_ar}</div>
                                            <div>Question Type: {savedQuestion.question_type}</div>
                                            {savedQuestion.question_options_ar.map(option => (
                                                <div key={option} className="answer-option">
                                                    {option}
                                                </div>
                                            ))}
                                            <Button
                                                size="small"
                                                theme="green"
                                                onClick={() => this.addToTemplate(savedQuestion.id)}
                                            >
                                                Add to Template
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="half-modal-body">
                                    <p>Click below to send question template to patient</p>
                                    {this.state.templateToSend.map(templateQuestion => (
                                        <div key={templateQuestion.id} className="saved-question">
                                            <div>Question: {templateQuestion.question_text_ar}</div>
                                            <div>
                                                Question Type: {templateQuestion.question_type}
                                            </div>
                                            {templateQuestion.question_options_ar.map(option => (
                                                <div key={option} className="answer-option">
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <Button
                                        size="small"
                                        theme="green"
                                        onClick={this.handleSendQuestionTemplate}
                                    >
                                        Send Template
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapState = state => ({
    loading: state.global.loading,
    savedQuestions: state.questionTemplate.savedQuestions,
    templateToSend: state.questionTemplate.templateToSend
});

export default compose(
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "createNewQuestionForm", enableReinitialize: true })
)(QuestionTemplateModal);
