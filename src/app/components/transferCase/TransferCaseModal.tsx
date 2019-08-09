import React, { Component } from "react";
// import Modal from 'react-modal'
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import SelectInputRegular from "../../form/SelectInputRegular";
import RadioGroup from "../../form/RadioGroup";
// import Loader from '../layout/Loader'
import * as actions from "./transferCaseActions";

class TransferCaseModal extends Component {
    state = {
        topLevelSpecialities: [],
        secondLevelSpecialities: [],
        hasSecondLevelSpecialities: false,
        primarySpecialityID: null,
        selectedSpecialityID: null,
        doctorsList: [],
        transferDoctor: false,
        transferRequestedSuccessfully: false
    };

    componentDidMount() {
        this.props.getTopLevelSpecialities();
        this.setState(() => ({
            transferRequestedSuccessfully: false
        }));
    }

    componentDidUpdate(prevProps) {
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
    handleSpecialityChange = (event, value) => {
        if (event.target.name === "top_level_speciality") {
            if (value) {
                this.props.getSecondLevelSpecialities(value);

                this.setState(() => ({
                    primarySpecialityID: value,
                    selectedSpecialityID: value
                }));
                if (this.state.transferDoctor) {
                    this.props.getSpecialityDoctorsList(value);
                }
            } else {
                this.setState(() => ({
                    secondLevelSpecialities: [],
                    hasSecondLevelSpecialities: false,
                    selectedSpecialityID: null
                }));
            }
        } else if (event.target.name === "second_level_speciality") {
            const prevSpecialityID = this.state.primarySpecialityID;

            if (value) {
                this.setState(() => ({
                    selectedSpecialityID: value
                }));
                if (this.state.transferDoctor) {
                    this.props.getSpecialityDoctorsList(value);
                }
            } else {
                this.setState(() => ({
                    selectedSpecialityID: prevSpecialityID
                }));
                if (this.state.transferDoctor) {
                    this.props.getSpecialityDoctorsList(prevSpecialityID);
                }
            }
        }
    };

    handleFormSubmit = values => {
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

    handleRadioChange = (event, value) => {
        if (value === "doctor") {
            this.props.getSpecialityDoctorsList(this.state.selectedSpecialityID);
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

const mapState = state => ({
    loading: state.transferCase.loading,
    signedInUser: state.auth.signedInUser,
    primarySpecialities: state.newCase.primarySpecialities,
    secondarySpecialities: state.newCase.secondarySpecialities,
    specialityDoctorsList: state.transferCase.specialityDoctorsList,
    transferRequestedSuccessfully: state.transferCase.transferRequestedSuccessfully
});

const validate = values => {
    const errors = {};
    if (values.specialityOrDoctor === "doctor" && !values.selected_doctor) {
        errors.selected_doctor = "برجاء اختيار الطبيب";
    }
    return errors;
};

export default compose(
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "trasnferCaseForm", enableReinitialize: true, validate })
)(TransferCaseModal);
