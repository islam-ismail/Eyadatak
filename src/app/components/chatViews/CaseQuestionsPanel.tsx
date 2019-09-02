import React, { Component, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "./chatCaseActions";
import Button from "../../UIComponents/Button";
import { TextAreaQuestion } from "./questionTypes/TextAreaQuestion";
import FileInputQuestion from "./questionTypes/FileInputQuestion";
import { RadioInputQuestion } from "./questionTypes/RadioInputQuestion";
import { CheckboxInputQuestion } from "./questionTypes/CheckboxInputQuestion";
import { reduxForm, InjectedFormProps } from "redux-form";
import { AppState } from "../../reducers/rootReducer";
import { ChatCaseSignatures, CaseChatElement } from "./chatCaseTypes";
import { CaseQuestion } from "../../types/models/CaseQuestion";
import { MedicalCase } from "../../types/models/MedicalCase";
import { SelectInputQuestion } from "./questionTypes/SelectInputQuestion";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    caseChatData: state.chatCase.caseChatData
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = ChatCaseSignatures;

interface CompOwnProps {
    caseUnansweredQuestions: CaseChatElement[];
    chatCase: MedicalCase;
    questionsOrHistoryActive: string;
}

interface FormData {
    unanswered_case_questions: any[];
}

type CompProps = InjectedFormProps<FormData> & CompOwnProps & CompStateProps & CompActionProps;

interface CompOwnState {
    uploadedFiles: File[][];
}

class CaseQuestionsPanel extends Component<CompProps, CompOwnState> {
    state: CompOwnState = {
        uploadedFiles: []
    };

    handleOnDrop = (acceptedFiles: File[], rejectedFiles: File[], questionId: number) => {
        acceptedFiles.map(file => {
            let tempArray: File[][] = this.state.uploadedFiles.slice();
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

    removeFile = (fileName: File, questionId: number) => {
        let tempArray: File[][] = this.state.uploadedFiles.slice();
        tempArray[questionId].splice(tempArray[questionId].indexOf(fileName), 1);
        this.setState(() => ({
            uploadedFiles: tempArray
        }));
    };

    handleFormSubmit = (values: FormData) => {
        this.props.handleSubmitAnswers(
            this.props.chatCase,
            values.unanswered_case_questions,
            this.props.caseUnansweredQuestions
        );
    };

    handleUploadFiles = () => {
        this.props.handleUploadFiles(this.props.chatCase, this.state.uploadedFiles);
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
                                        (filteredQuestion.question as CaseQuestion)
                                            .question_template.question_type === "FileInput"
                                )
                                .map(caseQuestion => (
                                    <div key={caseQuestion.id} className="question">
                                        <label>
                                            {
                                                (caseQuestion.question as CaseQuestion)
                                                    .question_template.question_text_ar
                                            }
                                        </label>
                                        <FileInputQuestion
                                            question={caseQuestion.question as CaseQuestion}
                                            handleOnDrop={this.handleOnDrop}
                                            removeFile={this.removeFile}
                                            uploadedFiles={this.state.uploadedFiles}
                                            questionId={(caseQuestion.question as CaseQuestion).id}
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
                                            (filteredQuestion.question as CaseQuestion)
                                                .question_template.question_type === "TextInput" ||
                                            (filteredQuestion.question as CaseQuestion)
                                                .question_template.question_type === "Textarea" ||
                                            (filteredQuestion.question as CaseQuestion)
                                                .question_template.question_type ===
                                                "CheckboxInput" ||
                                            (filteredQuestion.question as CaseQuestion)
                                                .question_template.question_type === "RadioInput" ||
                                            (filteredQuestion.question as CaseQuestion)
                                                .question_template.question_type === "SelectList"
                                    )
                                    .map(caseQuestion => (
                                        <div key={caseQuestion.id} className="question">
                                            <label>
                                                {
                                                    (caseQuestion.question as CaseQuestion)
                                                        .question_template.question_text_ar
                                                }
                                            </label>
                                            {/* {(caseQuestion.question as CaseQuestion).question_template.question_type === 'TextInput'
                        ? <TextInputQuestion question={(caseQuestion.question as CaseQuestion)} />
                        : <></>
                      } */}
                                            {(caseQuestion.question as CaseQuestion)
                                                .question_template.question_type === "Textarea" ||
                                            (caseQuestion.question as CaseQuestion)
                                                .question_template.question_type === "TextInput" ? (
                                                <TextAreaQuestion
                                                    question={caseQuestion.question as CaseQuestion}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {(caseQuestion.question as CaseQuestion)
                                                .question_template.question_type ===
                                            "CheckboxInput" ? (
                                                <CheckboxInputQuestion
                                                    question={caseQuestion.question as CaseQuestion}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {(caseQuestion.question as CaseQuestion)
                                                .question_template.question_type ===
                                            "RadioInput" ? (
                                                <RadioInputQuestion
                                                    question={caseQuestion.question as CaseQuestion}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            {(caseQuestion.question as CaseQuestion)
                                                .question_template.question_type ===
                                            "SelectList" ? (
                                                <SelectInputQuestion
                                                    question={caseQuestion.question as CaseQuestion}
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

const validate = (values: FormData) => {
    const errors = {};
    // if (!values.chat_reply) {
    //   console.log('EMPTY chat_reply')
    //   errors.chat_reply = "I AM EMPTY!"
    // }
    return errors;
};

export default compose<ComponentType<CompOwnProps>>(
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "caseQuestionForm", enableReinitialize: true, validate })
)(CaseQuestionsPanel);
