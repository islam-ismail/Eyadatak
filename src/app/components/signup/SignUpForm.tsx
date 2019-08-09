import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
    composeValidators,
    combineValidators,
    isRequired,
    matchesPattern,
    hasLengthLessThan,
    matchesField,
    hasLengthGreaterThan,
    isNumeric
} from "revalidate";
import TextInput from "../../form/TextInput";
import SelectInput from "../../form/SelectInput";
import * as actions from "../auth/authActions";
import { IS_EMAIL } from "../../util/constants";
import { generateYears, months, getDays } from "../../util/helpersFunc";

class SignUpForm extends Component {
    state = {
        month: "January",
        birthdateError: ""
    };

    handleFormSubmit = values => {
        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            birthdate: `${values.year}-${values.month}-${values.day}`,
            gender: values.gender,
            phone_number: parseInt(values.phone_number)
        };

        this.props.asyncSignUp(user);
    };

    handleMonthChange = (event, value) => {
        this.setState(() => ({
            month: value
        }));
    };

    handleBirthdateChange = error => {
        this.setState(() => ({
            birthdateError: error
        }));
    };

    render() {
        const { switchScreens } = this.props;
        return (
            <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <div className="multi-input">
                    <div className="form-group">
                        <Field
                            name="name"
                            type="text"
                            component={TextInput}
                            label="الاسم"
                            autofocus="autofocus"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <Field
                        name="email"
                        type="text"
                        component={TextInput}
                        label="البريد الإلكتروني"
                    />
                </div>
                <div className="multi-input">
                    <div className="form-group">
                        <Field
                            name="password"
                            type="password"
                            component={TextInput}
                            label="كلمة المرور"
                        />
                    </div>
                    <div className="form-group">
                        <Field
                            name="password_confirmation"
                            type="password"
                            component={TextInput}
                            label="تأكيد كلمة المرور"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <Field
                        name="phone_number"
                        type="tel"
                        component={TextInput}
                        label="رقم الهاتف"
                    />
                </div>
                <div className="multi-input">
                    <div className="form-group inline">
                        <label htmlFor="">تاريخ الميلاد </label>
                        <Field
                            name="year"
                            component={SelectInput}
                            label="سنة"
                            options={generateYears()}
                            className="s5"
                            required={true}
                            onBirthdayFieldChange={this.handleBirthdateChange}
                            manyFields={true}
                        />
                        <Field
                            name="month"
                            component={SelectInput}
                            label="شهر"
                            options={months}
                            required={true}
                            onBirthdayFieldChange={this.handleBirthdateChange}
                            manyFields={true}
                            onChange={this.handleMonthChange}
                        />
                        <Field
                            name="day"
                            component={SelectInput}
                            label="يوم"
                            required={true}
                            onBirthdayFieldChange={this.handleBirthdateChange}
                            manyFields={true}
                            options={getDays(this.state.month)}
                        />
                        <span className="err-msg">{this.state.birthdateError}</span>
                    </div>
                    <div className="form-group">
                        <Field
                            component={SelectInput}
                            name="gender"
                            required={true}
                            options={[
                                { key: "ذكر", value: "male" },
                                { key: "أنثى", value: "female" }
                            ]}
                            label="الجنس"
                        />
                    </div>
                </div>
                <div className="form-group btn-group">
                    <button className="login" type="submit">
                        إنشاء حساب جديد
                        <img src="images/left-arrow.svg" alt="" />
                    </button>
                    <button
                        className="signup"
                        type="button"
                        onClick={() => switchScreens("signin")}
                    >
                        تسجيل الدخول
                    </button>
                </div>
            </form>
        );
    }
}

const validate = combineValidators({
    name: composeValidators(
        isRequired({ message: "برجاء إدخال الاسم" }),
        hasLengthLessThan(255)({
            message: "الاسم لا يمكن أن يتجاوز 255 حرف"
        })
    )(),
    email: composeValidators(
        isRequired({ message: "برجاء إدخال البريد إلكتروني" }),
        matchesPattern(IS_EMAIL)({
            message: "برجاء إدخال بريد إلكتروني صحيح"
        })
    )(),
    password: composeValidators(
        isRequired({ message: "برجاء إدخال كلمة المرور" }),
        hasLengthLessThan(255)({
            message: "كلمة المرور لا يمكن أن تتجاوز 255 حرف أو رقم"
        }),
        hasLengthGreaterThan(6)({
            message: "كلمة المرور لا يمكن أن تقل عن 7 حروف وأرقام"
        })
    )(),
    password_confirmation: composeValidators(
        isRequired({ message: "برجاء إدخال كلمة المرور" }),
        hasLengthLessThan(255)({
            message: "كلمة المرور لا يمكن أن تتجاوز 255 حرف أو رقم"
        }),
        matchesField("password")({
            message: "كلمات المرور غير متطابقة"
        })
    )(),
    phone_number: composeValidators(
        isRequired({ message: "برجاء إدخال رقم الهاتف" }),
        isNumeric({
            message: "برجاء إدخال رقم هاتف صحيح"
        })
    )(),
    gender: isRequired({ message: "برجاء اختيار الجنس" }),
    year: isRequired({ message: "Please choose your year of birth." }),
    month: isRequired({ message: "Please choose your month of birth." }),
    day: isRequired({ message: "Please choose your day of birth." })
});

export default compose(
    connect(
        null,
        actions
    ),
    reduxForm({ form: "signupForm", enableReinitialize: true, validate })
)(SignUpForm);
