import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

type CompProps = RouteComponentProps;

class ScrollToTop extends React.Component<CompProps> {
    componentDidUpdate(prevProps: CompProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
