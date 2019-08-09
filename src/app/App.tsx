import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import { ToastContainer, Slide } from "react-toastify";
import Modal from "react-modal";
// import "react-toastify/dist/ReactToastify.css";
import GateWay from "./components/gateway/Gateway";
import Dashboard from "./components/dashboard/Dashboard";
import MyCasesList from "./components/myCasesList/MyCasesList";
import ChatViews from "./components/chatViews/ChatViews";
import Layout from "./components/layout/Layout";
import * as authActions from "./components/auth/authActions";
import * as globalStateActions from "./components/globalState/globalStateActions";
import { setAuthorizationHeader, getJWT, getLocale, setLocale } from "./util/helpersFunc";
import Error404 from "./components/errorsPages/Error404";
import Auth from "./components/auth/Auth";
import Loader from "./components/layout/Loader";
import { AppState } from "./reducers/rootReducer";

let baseURL: string;
if (process.env.NODE_ENV !== "production") {
    baseURL = "http://localhost:8080/backend/api";
} else {
    baseURL = "http://eyadatak.com/backend/api";
}

interface classProps {
    locale: string;
    loading: boolean;
}
class App extends Component<classProps> {
    componentDidMount() {
        let locale: string;
        locale = getLocale();
        if (!locale) {
            setLocale(locale);
            locale = getLocale();
        }

        document.body.classList.add(locale);
        axios.defaults.baseURL = baseURL + `/${locale}/`;

        const token = getJWT();
        if (token) {
            setAuthorizationHeader(token);
            authActions.autoSignIn();
        }
    }

    componentDidUpdate(prevProps: classProps) {
        if (prevProps.locale !== this.props.locale) {
            setLocale(this.props.locale);
            const locale = getLocale();
            document.body.classList.remove("en", "ar");
            document.body.classList.add(locale);
            axios.defaults.baseURL = baseURL + `/${locale}/`;
        }
    }

    render() {
        if (this.props.loading) {
            return <Loader loading={this.props.loading} />;
        } else {
            return (
                <>
                    <Auth>
                        <ToastContainer
                            position="top-center"
                            autoClose={false}
                            newestOnTop={true}
                            transition={Slide}
                            draggable
                            pauseOnFocusLoss
                            pauseOnHover
                        />
                        <Switch>
                            <Route path="/" exact component={GateWay} />
                        </Switch>

                        <Route
                            path="/(.+)"
                            render={() => (
                                <Layout>
                                    <Switch>
                                        <Route path="/dashboard" component={Dashboard} />
                                        <Route path="/my-cases-list" component={MyCasesList} />
                                        <Route path="/case-details" component={ChatViews} />
                                        <Route component={Error404} />
                                    </Switch>
                                </Layout>
                            )}
                        />
                    </Auth>
                </>
            );
        }
    }
}

Modal.setAppElement("#root");

const stateProps = (state: AppState) => ({
    locale: state.global.locale,
    loading: state.global.loading
});

const dispatchProps = {
    ...authActions,
    ...globalStateActions
};

export default compose(
    withRouter,
    connect(
        stateProps,
        dispatchProps
    )
)(App);
