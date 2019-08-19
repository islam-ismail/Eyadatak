import React, { Component, ComponentType, MouseEventHandler } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../globalState/globalStateActions";
import Button from "../../UIComponents/Button";
import { AppState } from "../../reducers/rootReducer";
interface CompProps {
    locale: string;
    switchToArabic: MouseEventHandler;
    switchToEnglish: MouseEventHandler;
}

class LanguageSwitcher extends Component<CompProps> {
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

const mapState = (state: AppState) => ({
    locale: state.global.locale
});

export default compose<ComponentType<CompProps>>(
    connect(
        mapState,
        actions
    )
)(LanguageSwitcher);
