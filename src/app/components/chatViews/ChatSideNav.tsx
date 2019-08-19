import React, { Component, MouseEventHandler, EventHandler, MouseEvent } from "react";
import userInfo from "../../assets/images/user-info.svg";
import help from "../../assets/images/help.svg";
import note from "../../assets/images/note.svg";

interface CompProps {
    detailsActive: string;
    toggleDetails: MouseEventHandler;
    questionsOrHistoryActive: string;
    toggleQuestionsOrHistory: MouseEventHandler;
    removeNote: boolean;
}

class ChatSideNav extends Component<CompProps> {
    render() {
        return (
            <div className="aside-nav">
                <div className={`item ${this.props.detailsActive}`}>
                    <a href="/" onClick={this.props.toggleDetails}>
                        <img src={userInfo} alt="user info" />
                    </a>
                </div>
                <div className={`item ${this.props.questionsOrHistoryActive}`}>
                    <a href="/" onClick={this.props.toggleQuestionsOrHistory}>
                        <img src={help} alt="user info" />
                        {this.props.removeNote ? (
                            <></>
                        ) : (
                            <>
                                <div className="note">
                                    <img src={note} alt="notification" />
                                </div>
                            </>
                        )}
                    </a>
                </div>
            </div>
        );
    }
}

export default ChatSideNav;
