import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

type CompProps = RouteComponentProps;

class ScrollToBottom extends React.Component<CompProps> {
    componentDidUpdate() {
        const messages = document.getElementById("messages");
        if (messages) {
            messages.scrollTo(0, messages.scrollHeight);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToBottom);
