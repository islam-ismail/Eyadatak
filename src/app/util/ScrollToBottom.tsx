import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToBottom extends React.Component {
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
