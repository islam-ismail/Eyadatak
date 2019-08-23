import React, { Component, ComponentType, ChangeEventHandler } from "react";
// import Modal from 'react-modal'
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import SelectInputRegular from "../../form/SelectInputRegular";
import RadioGroup from "../../form/RadioGroup";
// import Loader from '../layout/Loader'
import * as actions from "./transferCaseActions";
import { DoctorsWithSpecialities, TransferCaseActionsSignatures } from "./transferCaseTypes";
import { AppState } from "../../reducers/rootReducer";
import { MedicalCase } from "../../types/models/MedicalCase";

const mapState = (state: AppState) => ({
    loading: state.transferCase.loading,
    signedInUser: state.auth.signedInUser,
    primarySpecialities: state.newCase.primarySpecialities,
    secondarySpecialities: state.newCase.secondarySpecialities,
    specialityDoctorsList: state.transferCase.specialityDoctorsList,
    transferRequestedSuccessfully: state.transferCase.transferRequestedSuccessfully
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = TransferCaseActionsSignatures;

interface CompOwnProps {
    openTransferCaseDoctorModal: boolean;
    closeTransferCaseDoctorModal: () => void;
    transferCase: MedicalCase;
}

interface FormData {
    specialityOrDoctor: string;
    selected_doctor: number;
}

type CompProps = InjectedFormProps<FormData> & CompStateProps & CompActionProps & CompOwnProps;

interface CompState {
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
    doctorsList: DoctorsWithSpecialities[];
    transferDoctor: boolean;
    transferRequestedSuccessfully: boolean;
}

class TransferCaseModal extends Component<CompProps, CompState> {
    state: CompState = {
        topLevelSpecialities: [],
        secondLevelSpecialities: [],
        hasSecondLevelSpecialities: false,
        primarySpecialityID: 0,
        selectedSpecialityID: 0,
        doctorsList: [],
        transferDoctor: false,
        transferRequestedSuccessfully: false
    };

    componentDidMount() {
        this.props.setTopLevelSpecialities();
        this.setState(() => ({
            transferRequestedSuccessfully: false
        }));
    }

    componentDidUpdate(prevProps: CompProps) {
        if (prevProps.primarySpecialities !== this.props.primarySpecialities) {
            this.setTopLevelSpecialities();
        }
        if (prevProps.secondarySpecialities !== this.props.secondarySpecialities) {
            this.setSecondLevelSpecialities();
        }
        if (prevProps.specialityDoctorsList !== this.props.specialityDoctorsList) {
            this.setState(() => ({
                doctorsList: this.props.specialityDoctorsList
            }));
        }
        if (prevProps.transferRequestedSuccessfully !== this.props.transferRequestedSuccessfully) {
            this.setState(() => ({
                transferRequestedSuccessfully: this.props.transferRequestedSuccessfully
            }));
        }
    }

    setTopLevelSpecialities = () => {
        const { primarySpecialities } = this.props;
        if (primarySpecialities.length > 0) {
            this.setState(() => ({
                topLevelSpecialities: primarySpecialities.map(speciality => ({
                    key: speciality.id,
                    value: speciality.title_ar
                }))
            }));
        }
    };

    setSecondLevelSpecialities = () => {
        const { secondarySpecialities } = this.props;
        if (secondarySpecialities.length > 0) {
            this.setState(() => ({
                secondLevelSpecialities: secondarySpecialities.map(speciality => ({
                    key: speciality.id,
                    value: speciality.title_ar
                })),
                hasSecondLevelSpecialities: true
            }));
        }
    };

    // From Shaker's code in NewCaseForm.js
    // Handle the change in speciality dropdowns and set the the selectedSpecialityID
    // and set the other state to show / hide secondary specialities if there's none.
    // Also to render the required and none required questions based on the speciality.
    handleSpecialityChange: ChangeEventHandler<HTMLSelectElement> = event => {
        const value = parseInt(event.target.value, 10);

        if (event.target.name === "top_level_speciality") {
            if (value) {
                this.props.setSecondLevelSpecialities(value);

                this.setState(() => ({
                    primarySpecialityID: value,
                    selectedSpecialityID: value
                }));
                if (this.state.transferDoctor) {
                    this.props.setSpecialityDoctorsList(value);
                }
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
                if (this.state.transferDoctor) {
                    this.props.setSpecialityDoctorsList(value);
                }
            } else if (prevSpecialityID) {
                this.setState(() => ({
                    selectedSpecialityID: prevSpecialityID
                }));
                if (this.state.transferDoctor) {
                    this.props.setSpecialityDoctorsList(prevSpecialityID);
                }
            }
        }
    };

    handleFormSubmit = (values: FormData) => {
        console.log("values:", values);
        if (values.specialityOrDoctor === "doctor") {
            this.props.transferCaseToDoctor(
                this.props.transferCase,
                values.selected_doctor,
                this.state.selectedSpecialityID
            );
        } else {
            this.props.transferCaseToSpeciality(
                this.props.transferCase,
                this.state.selectedSpecialityID
            );
        }
    };

    handleRadioChange: ChangeEventHandler<HTMLInputElement> = event => {
        const value = event.target.value;

        if (value === "doctor") {
            this.props.setSpecialityDoctorsList(this.state.selectedSpecialityID);
            this.setState(() => ({
                transferDoctor: true
            }));
        } else {
            this.setState(() => ({
                transferDoctor: false
            }));
        }
    };

    render() {
        const {
            openTransferCaseDoctorModal,
            closeTransferCaseDoctorModal
            // loading
        } = this.props;

        const {
            topLevelSpecialities,
            secondLevelSpecialities,
            hasSecondLevelSpecialities,
            selectedSpecialityID,
            doctorsList,
            transferDoctor
        } = this.state;

        const radioOptions = [
            {
                key: 0,
                title: "تحويل إلى تخصص (سيتم تحديد الطبيب تلقائيًا)",
                value: "speciality"
            },
            {
                key: 1,
                title: "تحويل إلى طبيب",
                value: "doctor"
            }
        ];

        return (
            <>
                {/* <Modal
          isOpen={openTransferCaseDoctorModal}
          className='react-modal transfer-case-modal'
          overlayClassName='react-modal-overlay'
          portalClassName='react-modal-portal'
          contentLabel='Transfer Case Modal'
          onRequestClose={closeTransferCaseDoctorModal}
          closeTimeoutMS={300}
        > */}
                {openTransferCaseDoctorModal ? (
                    <>
                        <div className="modal-wrapper">
                            {/* <Loader loading={loading} /> */}
                            <div className="modal" id="transfer">
                                <div className="close" onClick={closeTransferCaseDoctorModal} />
                                <div className="content">
                                    {this.state.transferRequestedSuccessfully ? (
                                        <>
                                            <div className="header">
                                                <h4>تم التحويل بنجاح</h4>
                                                <button
                                                    className="btn"
                                                    type="reset"
                                                    onClick={closeTransferCaseDoctorModal}
                                                >
                                                    إغلاق
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="header">
                                                <h4>تحويل السؤال إلى طبيب آخر أو تخصص</h4>
                                                <p>برجاء اختيار تخصص أو طبيب لتحويل السؤال</p>
                                            </div>
                                            <div className="body">
                                                <form
                                                    className="form"
                                                    onSubmit={this.props.handleSubmit(
                                                        this.handleFormSubmit
                                                    )}
                                                >
                                                    <Field
                                                        name="top_level_speciality"
                                                        component={SelectInputRegular}
                                                        label="التخصص الرئيسي"
                                                        options={topLevelSpecialities}
                                                        onChange={this.handleSpecialityChange}
                                                        className="select"
                                                    />
                                                    {hasSecondLevelSpecialities ? (
                                                        <Field
                                                            name="second_level_speciality"
                                                            component={SelectInputRegular}
                                                            label="التخصص الفرعي"
                                                            options={secondLevelSpecialities}
                                                            onChange={this.handleSpecialityChange}
                                                            className="select"
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {selectedSpecialityID ? (
                                                        <>
                                                            <Field
                                                                component={RadioGroup}
                                                                name="specialityOrDoctor"
                                                                required={true}
                                                                options={radioOptions}
                                                                onChange={this.handleRadioChange}
                                                                className="radio-group"
                                                            />
                                                            {transferDoctor ? (
                                                                <>
                                                                    {doctorsList.length === 0 ? (
                                                                        <></>
                                                                    ) : (
                                                                        <Field
                                                                            name="selected_doctor"
                                                                            component={
                                                                                SelectInputRegular
                                                                            }
                                                                            label="الطبيب"
                                                                            options={doctorsList}
                                                                            className="select"
                                                                        />
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <button className="btn" type="submit">
                                                                نقل
                                                            </button>
                                                            <button className="btn" type="reset">
                                                                إلغاء
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </form>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {/* </Modal> */}
            </>
        );
    }
}

const validate = (values: FormData) => {
    const errors: any = {};

    if (values.specialityOrDoctor === "doctor" && !values.selected_doctor) {
        errors.selected_doctor = "برجاء اختيار الطبيب";
    }

    return errors;
};

export default compose<ComponentType<CompOwnProps>>(
    connect<CompStateProps, CompActionProps, CompOwnProps, AppState>(
        mapState,
        actions
    ),
    reduxForm({ form: "trasnferCaseForm", enableReinitialize: true, validate })
)(TransferCaseModal);
