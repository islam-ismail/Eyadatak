import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../globalState/globalStateActions";
import Button from "../../UIComponents/Button";

class LanguageSwitcher extends Component {
    render() {
        const { locale, switchToArabic, switchToEnglish } = this.props;
        const content =
            locale === "en" ? (
                <Button extraclasses="ar language-switcher" onClick={switchToArabic}>
                    عربي
                </Button>
            ) : (
                <Button extraclasses="en language-switcher" onClick={switchToEnglish}>
                    English
                </Button>
            );
        return <>{content}</>;
    }
}

const mapState = state => ({
    locale: state.global.locale
});

export default compose(
    connect(
        mapState,
        actions
    )
)(LanguageSwitcher);
