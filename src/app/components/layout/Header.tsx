import React, { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
// import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import magnifyingGlass from "../../assets/images/magnifying-glass.svg";
import profilePic from "../../assets/images/profile-pic01.svg";
// import Logo from "../logo/Logo";
// import Button from "../../UIComponents/Button";
import * as actions from "../auth/authActions";
import NewCaseModal from "../newCase/NewCaseModal";
import { AppState } from "../../reducers/rootReducer";
import { AuthActionsSignatures } from "../auth/authTypes";

const mapState = (state: AppState) => ({
    signedInUser: state.auth.signedInUser
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = AuthActionsSignatures;

type CompProps = CompStateProps & CompActionProps;

interface CompState {
    openNewCaseModal: boolean;
}

class Header extends Component<CompProps, CompState> {
    state: CompState = {
        openNewCaseModal: false
    };

    handleSignOut = () => {
        const { signOut, clearListsAction } = this.props;
        clearListsAction();
        signOut();
    };

    handleOpenModal = () => {
        this.setState(() => ({
            openNewCaseModal: true
        }));
    };

    handleCloseModal = () => {
        this.setState(() => ({
            openNewCaseModal: false
        }));
    };

    render() {
        if (!this.props.signedInUser) {
            return <Redirect to="/" />;
        }
        const { openNewCaseModal } = this.state;

        return (
            <header className="main-header">
                <NewCaseModal
                    openNewCaseModal={openNewCaseModal}
                    closeNewCaseModal={this.handleCloseModal}
                />

                {/* Button for SignOut */}
                <div className="top-bar">
                    <div className="profile-pic">
                        <a href="/my-settings">
                            <img src={profilePic} alt={this.props.signedInUser.name} />
                            {/* <img src={this.props.signedInUser.picture_url} alt={this.props.signedInUser.name} /> */}
                        </a>
                    </div>
                    <div className="actions">
                        <div className="search">
                            <input type="search" placeholder="تبحث عن شيء؟" />
                            <div className="s-icon">
                                <img src={magnifyingGlass} alt="search icon" />
                            </div>
                        </div>
                        <div className="logout">
                            <button className="btn" onClick={this.handleSignOut} />
                        </div>
                        {this.props.signedInUser.type === "patient" ? (
                            <div className="new-case">
                                <button onClick={this.handleOpenModal} className="btn">
                                    سؤال جديد
                                    <span>
                                        <svg
                                            id="Group_146"
                                            data-name="Group 146"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                        >
                                            <path
                                                id="Path_241"
                                                data-name="Path 241"
                                                d="M9.457,4.3H5.7V.544A.674.674,0,0,0,5,0a.674.674,0,0,0-.7.543V4.3H.543A.674.674,0,0,0,0,5a.674.674,0,0,0,.543.7H4.3v3.76A.674.674,0,0,0,5,10a.674.674,0,0,0,.7-.543V5.7h3.76A.674.674,0,0,0,10,5,.674.674,0,0,0,9.457,4.3Z"
                                                transform="translate(0 -0.001)"
                                                fill="#183247"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

export default compose<ComponentType>(
    connect(
        mapState,
        actions
    )
)(Header);
