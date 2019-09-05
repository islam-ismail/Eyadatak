import React, { Component, ComponentType } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { ToastContainer, Slide } from "react-toastify";
import Modal from "react-modal";
import GateWay from "./components/gateway/Gateway";
import Dashboard from "./components/dashboard/Dashboard";
import MyCasesList from "./components/myCasesList/MyCasesList";
import ChatViews from "./components/chatViews/ChatViews";
import Layout from "./components/layout/Layout";
import * as authActions from "./components/auth/authActions";
import * as globalStateActions from "./components/globalState/globalStateActions";
import { setLocale } from "./util/helpersFunc";
import Error404 from "./components/errorsPages/Error404";
import Auth from "./components/auth/Auth";
import Loader from "./components/layout/Loader";
import { AppState } from "./reducers/rootReducer";
import { AuthActionsSignatures } from "./components/auth/authTypes";
import { GlobalStateActionSignatures } from "./components/globalState/globalStateTypes";
import AcceptSuccess from "./components/payment/accept-success";
import UserSettings from "./components/user-settings/UserSettings";
import UserWallet from "./components/user-wallet/UserWallet";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    loading: state.global.loading
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = AuthActionsSignatures & GlobalStateActionSignatures;

type CompProps = CompStateProps & CompActionProps;

class App extends Component<CompProps> {
    componentDidUpdate(prevProps: CompProps) {
        if (
            prevProps.locale !== this.props.locale &&
            this.props.locale &&
            this.props.locale !== "null"
        ) {
            const locale = this.props.locale;

            if (locale) {
                setLocale(locale);

                this.props.setLocale(locale);

                document.body.classList.remove("en", "ar");
                document.body.classList.add(locale);
            }
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
                                        <Route path="/case-details/:caseId" component={ChatViews} />
                                        <Route
                                            path="/payment/accept/success"
                                            component={AcceptSuccess}
                                        />
                                        <Route path="/my-wallet" component={UserWallet} />
                                        <Route path="/my-settings" component={UserSettings} />

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

const dispatchProps = {
    ...authActions,
    ...globalStateActions
};

export default compose<ComponentType>(
    withRouter,
    connect(
        mapState,
        dispatchProps
    )
)(App);
