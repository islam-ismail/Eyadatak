import React, { Component, ChangeEventHandler, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import * as revalidate from "revalidate";
import TextInput from "../../form/TextInput";
import SelectInput from "../../form/SelectInput";
import * as actions from "../auth/authActions";
import { IS_EMAIL } from "../../util/constants";
import { generateYears, months, getDays } from "../../util/helpersFunc";
import { SignUpFormData, AuthActionsSignatures } from "../auth/authTypes";

type CompActionProps = AuthActionsSignatures;

interface CompOwnProps {
    switchScreens: (screenName: string) => void;
}

type FormData = SignUpFormData & { year: number; month: number; day: number };

type CompProps = InjectedFormProps<FormData> & CompActionProps & CompOwnProps;

interface CompState {
    month: string;
    birthdateError: string;
}

class SignUpForm extends Component<CompProps, CompState> {
    state = {
        month: "January",
        birthdateError: ""
    };

    handleMonthChange: ChangeEventHandler<HTMLSelectElement> = event => {
        this.setState(() => ({
            month: event.target.value
        }));
    };

    handleBirthdateChange = (error: string) => {
        this.setState(() => ({
            birthdateError: error
        }));
    };

    handleFormSubmit = (values: FormData) => {
        const user: SignUpFormData = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            birthdate: `${values.year}-${values.month}-${values.day}`,
            gender: values.gender,
            phone_number: values.phone_number
        };

        this.props.asyncSignUp(user);
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

const validate = revalidate.combineValidators({
    name: revalidate.composeValidators(
        revalidate.isRequired({ message: "برجاء إدخال الاسم" }),
        revalidate.hasLengthLessThan(255)({
            message: "الاسم لا يمكن أن يتجاوز 255 حرف"
        })
    )(),
    email: revalidate.composeValidators(
        revalidate.isRequired({ message: "برجاء إدخال البريد إلكتروني" }),
        revalidate.matchesPattern(IS_EMAIL)({
            message: "برجاء إدخال بريد إلكتروني صحيح"
        })
    )(),
    password: revalidate.composeValidators(
        revalidate.isRequired({ message: "برجاء إدخال كلمة المرور" }),
        revalidate.hasLengthLessThan(255)({
            message: "كلمة المرور لا يمكن أن تتجاوز 255 حرف أو رقم"
        }),
        revalidate.hasLengthGreaterThan(6)({
            message: "كلمة المرور لا يمكن أن تقل عن 7 حروف وأرقام"
        })
    )(),
    password_confirmation: revalidate.composeValidators(
        revalidate.isRequired({ message: "برجاء إدخال كلمة المرور" }),
        revalidate.hasLengthLessThan(255)({
            message: "كلمة المرور لا يمكن أن تتجاوز 255 حرف أو رقم"
        }),
        revalidate.matchesField("password", "Password")({
            message: "كلمات المرور غير متطابقة"
        })
    )(),
    phone_number: revalidate.composeValidators(
        revalidate.isRequired({ message: "برجاء إدخال رقم الهاتف" }),
        revalidate.isNumeric({
            message: "برجاء إدخال رقم هاتف صحيح"
        })
    )(),
    gender: revalidate.isRequired({ message: "برجاء اختيار الجنس" }),
    year: revalidate.isRequired({ message: "Please choose your year of birth." }),
    month: revalidate.isRequired({ message: "Please choose your month of birth." }),
    day: revalidate.isRequired({ message: "Please choose your day of birth." })
});

export default compose<ComponentType<CompOwnProps>>(
    connect(
        null,
        actions
    ),
    reduxForm({ form: "signupForm", enableReinitialize: true, validate })
)(SignUpForm);
