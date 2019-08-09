import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "./chatCaseActions";
import Button from "../../UIComponents/Button";
import { TextAreaQuestion } from "./questionTypes/TextAreaQuestion";
import FileInputQuestion from "./questionTypes/FileInputQuestion";
import { RadioInputQuestion } from "./questionTypes/RadioInputQuestion";
import { CheckboxInputQuestion } from "./questionTypes/CheckboxInputQuestion";

class CaseQuestionsPanel extends Component {
    state = {
        uploadedFiles: []
    };

    handleOnDrop = (acceptedFiles, rejectedFiles, questionId: number) => {
        acceptedFiles.map(file => {
            let tempArray = this.state.uploadedFiles.slice();
            if (this.state.uploadedFiles[questionId]) {
                tempArray[questionId] = this.state.uploadedFiles[questionId].slice();
                tempArray[questionId].push(file);
            } else {
                tempArray[questionId] = [];
                tempArray[questionId].push(file);
            }
            this.setState(() => ({
                uploadedFiles: tempArray
            }));
            return {};
        });
    };

    removeFile = (fileName, questionId) => {
        let tempArray = this.state.uploadedFiles.slice();
        tempArray[questionId].splice(tempArray[questionId].indexOf(fileName), 1);
        this.setState(() => ({
            uploadedFiles: tempArray
        }));
    };

    handleFormSubmit = values => {
        this.props.handleSubmitAnswers(
            this.props.caseId,
            values.unanswered_case_questions,
            this.props.caseUnansweredQuestions
        );
    };

    handleUploadFiles = () => {
        this.props.handleUploadFiles(this.props.caseId, this.state.uploadedFiles);
    };

    render() {
        const { invalid, submitting, pristine, questionsOrHistoryActive } = this.props;
        return (
            <>
                <div
                    className={`questions aside${
                        questionsOrHistoryActive === "active" ? "-active" : ""
                    }`}
                >
                    {!this.props.caseUnansweredQuestions ||
                    this.props.caseUnansweredQuestions.length === 0 ? (
                        <>
                            <div className="title">
                                <h3>لا يوجد أسئلة حاليًا من الطبيب</h3>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="title">
                                <h3>أسئلة من الطبيب</h3>
                            </div>
                            {this.props.caseUnansweredQuestions
                                .filter(
                                    filteredQuestion =>
                                        filteredQuestion.question.question_template
                                            .question_type === "FileInput"
                                )
                                .map(caseQuestion => (
                                    <div key={caseQuestion.id} className="question">
                                        <label>
                                            {
                                                caseQuestion.question.question_template
                                                    .question_text_ar
                                            }
                                        </label>
                                        <FileInputQuestion
                                            question={caseQuestion.question}
                                            handleOnDrop={this.handleOnDrop}
                                            removeFile={this.removeFile}
                                            uploadedFiles={this.state.uploadedFiles}
                                            questionId={caseQuestion.question.id}
                                        />
                                        <div className="upload">
                                            <button
                                                className="btn"
                                                onClick={this.handleUploadFiles}
                                            >
                                                رفع الملفات
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                                {this.props.caseUnansweredQuestions
                                    .filter(
                                        filteredQuestion =>
                                            filteredQuestion.question.question_template
                                                .question_type === "TextInput" ||
                                            filteredQuestion.question.question_template
                                                .question_type === "Textarea" ||
                                            filteredQuestion.question.question_template
                                                .question_type === "CheckboxInput" ||
                                            filteredQuestion.question.question_template
                                                .question_type === "RadioInput"
                                    )
                                    .map(caseQuestion => (
                                        <div key={caseQuestion.id} className="question">
                                            <label>
                                                {
                                                    caseQuestion.question.question_template
                                                        .question_text_ar
                                                }
                                            </label>
                                            {/* {caseQuestion.question.question_template.question_type === 'TextInput'
                        ? <TextInputQuestion question={caseQuestion.question} />
                        : <></>
                      } */}
                                            {caseQuestion.question.question_template
                                                .question_type === "Textarea" ||
                                            caseQuestion.question.question_template
                                                .question_type === "TextInput" ? (
                                                <TextAreaQuestion
                                                    question={caseQuestion.question}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {caseQuestion.question.question_template
                                                .question_type === "CheckboxInput" ? (
                                                <CheckboxInputQuestion
                                                    question={caseQuestion.question}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {caseQuestion.question.question_template
                                                .question_type === "RadioInput" ? (
                                                <RadioInputQuestion
                                                    question={caseQuestion.question}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    ))}
                                <div className="submit">
                                    <Button
                                        disabled={invalid || submitting || pristine}
                                        type="submit"
                                    >
                                        حفظ
                                    </Button>
                                    {/* <Button
                    disabled={invalid || submitting || pristine}
                    type='reset'
                  >
                    حذف
                  </Button> */}
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </>
        );
    }
}

const mapState = state => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    caseChatData: state.chatCase.caseChatData
});

const validate = values => {
    const errors = {};
    // if (!values.chat_reply) {
    //   console.log('EMPTY chat_reply')
    //   errors.chat_reply = "I AM EMPTY!"
    // }
    return errors;
};

export default compose(
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "caseQuestionForm", enableReinitialize: true, validate })
)(CaseQuestionsPanel);
