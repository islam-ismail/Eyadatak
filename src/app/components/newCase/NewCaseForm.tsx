import React, { Component, ComponentType, ChangeEventHandler } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import CheckboxGroup from "../../form/CheckboxGroup";
import RadioGroup from "../../form/RadioGroup";
import SelectInputRegular from "../../form/SelectInputRegular";
import TextAreaRegular from "../../form/TextAreaRegular";
import TextInputRegular from "../../form/TextInputRegular";
import { AppState } from "../../reducers/rootReducer";
import Button from "../../UIComponents/Button";
// import { composeValidators, combineValidators, isRequired } from "revalidate";
// import { combineValidators, isRequired } from "revalidate";
import FileInputQuestion from "../chatViews/questionTypes/FileInputQuestion";
// import UploadInput from "../../form/UploadInput";
// import DropzoneInput from "../../form/DropzoneInput";
// import Dropzone from "react-dropzone";
import * as actions from "./newCaseActions";
import { NewCaseActionsSignatures } from "./newCaseTypes";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    primarySpecialities: state.newCase.primarySpecialities,
    secondarySpecialities: state.newCase.secondarySpecialities,
    initialRequiredQuestions: state.newCase.initialRequiredQuestions,
    requiredQuestions: state.newCase.requiredQuestions,
    initialNotRequiredQuestions: state.newCase.initialNotRequiredQuestions,
    notRequiredQuestions: state.newCase.notRequiredQuestions
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = NewCaseActionsSignatures;

interface CompOwnProps {
    handleUploadFiles: (caseId: number, uploadedFiles: File[][]) => void;
    caseId: number;
}

interface FormData {
    question_description: string;
}

type CompProps = InjectedFormProps<FormData> & CompOwnProps & CompStateProps & CompActionProps;

type CompState = {
    topLevelSpecialities: {
        key: number;
        value: string;
    }[];
    secondLevelSpecialities: {
        key: number;
        value: string;
    }[];
    hasSecondLevelSpecialities: boolean;
    primarySpecialityID: number;
    selectedSpecialityID: number;
    uploadedFiles: File[][];
};

class NewCaseForm extends Component<CompProps, CompState> {
    state: CompState = {
        topLevelSpecialities: [],
        secondLevelSpecialities: [],
        hasSecondLevelSpecialities: false,
        primarySpecialityID: 0,
        selectedSpecialityID: 0,
        uploadedFiles: []
    };

    componentDidMount() {
        // Get all the initial questions and specialities for the form
        // in one call
        this.props.getInitialQuestionValues();
        this.setTopLevelSpecialities();

        // // fire the getPrimarySpecialities and assign it to state
        // this.props.asyncGetPrimarySpecialities();
        // this.setTopLevelSpecialities();

        // // fire the get Required and Not Required questions
        // this.props.asyncGetInitialRequiredQuestions();
        // this.props.asyncGetInitialNotRequiredQuestions();
    }

    // Check for updates in the store state to update the specialities and other stuff
    componentDidUpdate(prevProp: CompProps) {
        if (
            prevProp.primarySpecialities !== this.props.primarySpecialities ||
            prevProp.locale !== this.props.locale
        ) {
            this.setTopLevelSpecialities();
        }

        if (
            prevProp.secondarySpecialities !== this.props.secondarySpecialities ||
            prevProp.locale !== this.props.locale
        ) {
            this.setSecondLevelSpecialities();
        }
    }

    handleOnDrop = (acceptedFiles: File[], rejectedFiles: File[], questionId: number) => {
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

    removeFile = (fileName: File, questionId: number) => {
        let tempArray = this.state.uploadedFiles.slice();
        tempArray[questionId].splice(tempArray[questionId].indexOf(fileName), 1);
        this.setState(() => ({
            uploadedFiles: tempArray
        }));
    };

    handleUploadFiles = () => {
        this.props.handleUploadFiles(this.props.caseId, this.state.uploadedFiles);
    };

    // Set the Top Level Specialities
    setTopLevelSpecialities = () => {
        const { locale, primarySpecialities } = this.props;

        if (primarySpecialities.length > 0) {
            if (locale === "en") {
                this.setState(() => ({
                    topLevelSpecialities: primarySpecialities.map(speciality => ({
                        key: speciality.id,
                        value: speciality.title_en
                    }))
                }));
            } else if (locale === "ar") {
                this.setState(() => ({
                    topLevelSpecialities: primarySpecialities.map(speciality => ({
                        key: speciality.id,
                        value: speciality.title_ar
                    }))
                }));
            }
        }
    };

    // Set the Second Level Specialities
    setSecondLevelSpecialities = () => {
        const { locale, secondarySpecialities } = this.props;

        if (secondarySpecialities.length > 0) {
            if (locale === "en") {
                this.setState(() => ({
                    secondLevelSpecialities: secondarySpecialities.map(speciality => ({
                        key: speciality.id,
                        value: speciality.title_en
                    })),
                    hasSecondLevelSpecialities: true
                }));
            }
            if (locale === "ar") {
                this.setState(() => ({
                    secondLevelSpecialities: secondarySpecialities.map(speciality => ({
                        key: speciality.id,
                        value: speciality.title_ar
                    })),
                    hasSecondLevelSpecialities: true
                }));
            }
        } else {
            this.setState(() => ({
                secondLevelSpecialities: [],
                hasSecondLevelSpecialities: false
            }));
        }
    };

    // Handle the change in speciality dropdowns and set the the selectedSpecialityID
    // and set the other state to show / hide secondary specialities if there's none.
    // Also to render the required and none required questions based on the speciality.
    handleSpecialityChange: ChangeEventHandler<HTMLSelectElement> = event => {
        const value = parseInt(event.target.value, 10);

        if (event.target.name === "top_level_speciality") {
            if (value) {
                this.props.asyncGetSecondarySpecialities(value);

                this.setState(() => ({
                    primarySpecialityID: value,
                    selectedSpecialityID: value
                }));
            } else {
                this.setState(() => ({
                    secondLevelSpecialities: [],
                    hasSecondLevelSpecialities: false,
                    selectedSpecialityID: 0
                }));
            }
        } else if (event.target.name === "second_level_speciality") {
            const prevSpecialityID = this.state.primarySpecialityID;

            if (value) {
                this.setState(() => ({
                    selectedSpecialityID: value
                }));
            } else {
                this.setState(() => ({
                    selectedSpecialityID: prevSpecialityID
                }));
            }
        }
    };

    handleFormSubmit = (values: FormData) => {
        if (this.props.signedInUser) {
            this.props.addNewCase(
                this.state.selectedSpecialityID,
                values.question_description,
                this.props.signedInUser.id
            );
        }
    };

    // handleFileChange = e => {
    //   console.log(e.target.files[0]);
    // };

    render() {
        const {
            topLevelSpecialities,
            secondLevelSpecialities,
            hasSecondLevelSpecialities
        } = this.state;

        const {
            initialRequiredQuestions,
            // requiredQuestions,
            // initialNotRequiredQuestions,
            // notRequiredQuestions,
            locale,
            invalid,
            submitting,
            pristine
        } = this.props;

        let renderRequired;
        let renderNotRequired;

        if (initialRequiredQuestions.length > 0) {
            if (locale === "en") {
                renderRequired = initialRequiredQuestions.map(question => {
                    // console.log(question);
                    if (question.question_type === "TextInput") {
                        return (
                            <Field
                                key={question.id}
                                name={`speciality_questions[${question.id}]`}
                                type="text"
                                component={TextInputRegular}
                                label={question.question_text_en}
                            />
                        );
                    } else if (question.question_type === "SelectList") {
                        const selectOptions = question.question_options_en.map((value, key) => ({
                            key: value,
                            value
                        }));
                        return (
                            <Field
                                key={question.id}
                                name={`speciality_questions[${question.id}]`}
                                component={SelectInputRegular}
                                label={question.question_text_en}
                                options={selectOptions}
                            />
                        );
                    } else if (question.question_type === "CheckboxInput") {
                        const checkBoxesOptions: {
                            label: string;
                            value: string;
                        }[] = question.question_options_en.map((value, _) => ({
                            label: value,
                            value: value
                        }));
                        return (
                            <div className="inputs-row horizontal" key={question.id}>
                                <h3>{question.question_text_en}</h3>
                                <CheckboxGroup
                                    input={{ name: `speciality_questions[${question.id}]` }}
                                    options={checkBoxesOptions}
                                />
                            </div>
                        );
                    } else if (question.question_type === "RadioInput") {
                        const radioOptions = question.question_options_en.map((value, key) => ({
                            key: key,
                            title: value,
                            value: value
                        }));
                        return (
                            <div className="inputs-row horizontal" key={question.id}>
                                <h3>{question.question_text_en}</h3>
                                <Field
                                    component={RadioGroup}
                                    name={`speciality_questions[${question.id}]`}
                                    required={true}
                                    options={radioOptions}
                                />
                            </div>
                        );
                    } else if (question.question_type === "FileInput") {
                        return (
                            // <div className="file-upload" key={question.id}>
                            //     <Field
                            // name={`speciality_questions[${
                            //     question.id
                            // }]`}
                            //         component={UploadInput}
                            //         label={question.question_text_en}
                            //         onChange={e => this.handleFileChange(e)}
                            //     />
                            // </div>
                            <div className="file-upload" key={question.id}>
                                <h3>{question.question_text_en}</h3>
                                <Field
                                    name={`speciality_questions[${question.id}]`}
                                    handleOnDrop={this.handleOnDrop}
                                    removeFile={this.removeFile}
                                    uploadedFiles={this.state.uploadedFiles}
                                    question={question}
                                    questionId={question.id}
                                    component={FileInputQuestion}
                                />
                            </div>
                        );
                    } else if (question.question_type === "Textarea") {
                        return (
                            <Field
                                key={question.id}
                                name={`speciality_questions[${question.id}]`}
                                type="text"
                                component={TextAreaRegular}
                                label={question.question_text_en}
                            />
                        );
                    } else {
                        return null;
                    }
                });
            }
        }

        // if (initialNotRequiredQuestions.length > 0) {
        //     renderNotRequired = initialNotRequiredQuestions.map(question => {
        //         return <div key={question.id}>{question.question_text_en}</div>;
        //     });
        // }

        return (
            <div className="new-case-form">
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                    <Field
                        name="question_title"
                        type="text"
                        component={TextInputRegular}
                        label="Question Title"
                    />
                    <Field
                        name="question_description"
                        type="text"
                        component={TextAreaRegular}
                        label="Question Description"
                    />
                    <Field
                        name="top_level_speciality"
                        component={SelectInputRegular}
                        label="Select Primary Specialities"
                        options={topLevelSpecialities}
                        onChange={this.handleSpecialityChange}
                    />
                    {hasSecondLevelSpecialities && (
                        <Field
                            name="second_level_speciality"
                            component={SelectInputRegular}
                            label="Select Secondary Specialities"
                            options={secondLevelSpecialities}
                            onChange={this.handleSpecialityChange}
                        />
                    )}

                    <h3>Required Questions</h3>
                    {renderRequired}
                    {renderNotRequired}

                    <Button
                        disabled={invalid || submitting || pristine}
                        type="submit"
                        size="big"
                        theme="black"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

// const validate = (values, ownProps) => {
//   const dynamicValidations = ownProps.initialRequiredQuestions.reduce(
//     (accu, curr) => {
//       // accu["speciality_questions[" + curr.id + "]"] = isRequired({
//       accu[`speciality_questions.${curr.id}`] = isRequired({
//         message: `This field is required.`
//       });
//       return accu;
//     },
//     {}
//   );

//   console.log("shaker", dynamicValidations);

//   return combineValidators({
//     ...dynamicValidations
//   })(values);
// };

export default compose<ComponentType>(
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "newCaseForm", enableReinitialize: true })
    // reduxForm({ form: "newCaseForm", enableReinitialize: true, validate })
)(NewCaseForm);
