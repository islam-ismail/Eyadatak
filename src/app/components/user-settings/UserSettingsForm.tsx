import React, { ChangeEventHandler, Component, ComponentType } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { compose } from "redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import * as revalidate from "revalidate";
import SelectInput from "../../form/SelectInput";
import TextInput from "../../form/TextInput";
import { AppState } from "../../reducers/rootReducer";
import { IS_EMAIL } from "../../util/constants";
import { generateYears, getDays, months } from "../../util/helpersFunc";
import * as actions from "../auth/authActions";
import { AuthActionsSignatures, UpdateUserFormData } from "../auth/authTypes";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = AuthActionsSignatures;

type FormData = UpdateUserFormData & { year: string; month: string; day: string };

interface CompOwnProps extends Pick<InjectedFormProps, "initialValues"> {}

type CompProps = CompOwnProps &
    RouteComponentProps &
    InjectedFormProps<FormData> &
    CompActionProps &
    CompStateProps;

interface CompState {
    month: string;
    birthdateError: string;
}

class UserSettingsForm extends Component<CompProps, CompState> {
    state: CompState = {
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
        const user: UpdateUserFormData = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            birthdate: `${values.year}-${values.month}-${values.day}`,
            gender: values.gender,
            phone_number: values.phone_number
        };

        this.props.asyncUpdateUser(user);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <div className="block">
                    <h4>إعدادات الحساب</h4>
                    <p>قم بتعديل الحقول أدناه للإعدادات المفضلة لديك.</p>
                </div>
                <div className="block">
                    <div className="fixed-width">
                        <Field
                            name="name"
                            type="text"
                            component={TextInput}
                            label="الاسم"
                            autofocus="autofocus"
                        />
                    </div>
                </div>
                <div className="block">
                    <div className="fixed-width">
                        <Field
                            name="email"
                            type="text"
                            component={TextInput}
                            label="البريد الإلكتروني"
                        />
                    </div>
                </div>
                <div className="block">
                    <div className="fixed-width">
                        <Field
                            name="password"
                            type="password"
                            component={TextInput}
                            label="كلمة المرور"
                        />
                    </div>
                </div>
                <div className="block">
                    <div className="fixed-width">
                        <Field
                            name="password_confirmation"
                            type="password"
                            component={TextInput}
                            label="تأكيد كلمة المرور"
                        />
                    </div>
                </div>
                <div className="block">
                    <div className="fixed-width">
                        <Field
                            name="phone_number"
                            type="tel"
                            component={TextInput}
                            label="رقم الهاتف"
                        />
                    </div>
                </div>
                <div className="block">
                    <div className="fixed-width">
                        <label htmlFor="">تاريخ الميلاد </label>
                        <Field
                            name="year"
                            component={SelectInput}
                            label="سنة"
                            options={generateYears()}
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
                </div>
                <div className="block">
                    <div className="fixed-width">
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
                <div className="block">
                    <div className="fixed-width">
                        <button className="btn btn-success" type="submit">
                            تحديث
                        </button>
                    </div>
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
        revalidate.hasLengthLessThan(255)({
            message: "كلمة المرور لا يمكن أن تتجاوز 255 حرف أو رقم"
        }),
        revalidate.hasLengthGreaterThan(6)({
            message: "كلمة المرور لا يمكن أن تقل عن 7 حروف وأرقام"
        })
    )(),
    password_confirmation: revalidate.composeValidators(
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
        mapState,
        actions
    ),
    reduxForm({ form: "updateUserForm", enableReinitialize: true, validate })
)(UserSettingsForm);
