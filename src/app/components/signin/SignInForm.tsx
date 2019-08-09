import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import TextInput from "../../form/TextInput";
import * as actions from "../auth/authActions";
import { composeValidators, combineValidators, isRequired, matchesPattern } from "revalidate";
import { IS_EMAIL } from "../../util/constants";

class SignInForm extends Component {
    componentDidUpdate() {
        const { authenticated, history } = this.props;
        if (authenticated) {
            history.push("/dashboard");
        }
    }

    render() {
        const { handleSubmit, asyncSignIn, switchScreens } = this.props;
        return (
            <form onSubmit={handleSubmit(asyncSignIn)}>
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

const mapState = state => ({
    signedInUser: state.auth.signedInUser,
    authenticated: state.auth.authenticated
});

export default compose(
    withRouter,
    connect(
        mapState,
        actions
    ),
    reduxForm({ form: "signinForm", enableReinitialize: true, validate })
)(SignInForm);
