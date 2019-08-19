import React, { Component, ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import TextInput from "../../form/TextInput";
import * as actions from "../auth/authActions";
import { composeValidators, combineValidators, isRequired, matchesPattern } from "revalidate";
import { IS_EMAIL } from "../../util/constants";
import { AppState } from "../../reducers/rootReducer";
import { SignInFormData, AuthActionsSignatures } from "../auth/authTypes";

const mapState = (state: AppState) => ({
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated
});

type CompStateProps = ReturnType<typeof mapState>;

interface CompOwnProps {
    switchScreens: (screenName: string) => void;
}

type CompActionProps = AuthActionsSignatures;

type FormData = SignInFormData;

type CompProps = InjectedFormProps<FormData> & CompStateProps & CompActionProps & CompOwnProps;

class SignInForm extends Component<CompProps> {
    handleFormSubmit = (values: FormData) => {
        this.props.asyncSignIn(values);
    };

    render() {
        const { handleSubmit, switchScreens } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="form-group">
                    <Field
                        name="email"
                        type="text"
                        component={TextInput}
                        label="البريد الإلكتروني"
                    />
                </div>
                <div className="form-group">
                    <Field
                        name="password"
                        type="password"
                        component={TextInput}
                        label="كلمة السر"
                    />
                </div>
                <div className="form-group btn-group">
                    <button className="login" type="submit">
                        دخول <img src="images/left-arrow.svg" alt="" />
                    </button>
                    <button
                        className="signup"
                        type="button"
                        onClick={() => switchScreens("signup")}
                    >
                        إنشاء حساب جديد
                    </button>
                </div>
            </form>
        );
    }
}

const validate = combineValidators({
    email: composeValidators(
        isRequired({ message: "برجاء إدخال البريد الإلكتروني" }),
        matchesPattern(IS_EMAIL)({
            message: "برجاءإدخال بريد إلكتروني صالح "
        })
    )(),
    password: isRequired({ message: "برجاء إدخال كلمة المرور" })
});

export default compose<ComponentType<CompOwnProps>>(
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "signinForm", enableReinitialize: true, validate })
)(SignInForm);
