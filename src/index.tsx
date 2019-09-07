import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "./app/css/app.css";
import "./app/css/other-styles.css";
import App from "./app/App";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/util/ScrollToTop";
import { AppState } from "./app/reducers/rootReducer";
import { initialAuthState } from "./app/components/auth/authReducer";
import { initialChatCaseState } from "./app/components/chatViews/chatCaseReducer";
import { initialHistoryAccessState } from "./app/components/chatViews/historyAccess/historyAccessReducer";
import { initialHistoryCaseState } from "./app/components/chatViews/historyCase/historyCaseReducer";
import { initialGlobalState } from "./app/components/globalState/globalStateReducer";
import { initialMyCasesListState } from "./app/components/myCasesList/myCasesListReducer";
import { initialNewCaseState } from "./app/components/newCase/newCaseReducer";
import { initialQuestionTemplateState } from "./app/components/questionTemplate/questionTemplateReducer";
import { initialTransferCaseState } from "./app/components/transferCase/transferCaseReducer";
import "./interceptor";
import { initialPaymentReceiptsListState } from "./app/components/user-wallet/PaymentReceiptsListReducer";

const appInitialState: AppState = {
    global: initialGlobalState,
    auth: initialAuthState,
    form: {},
    newCase: initialNewCaseState,
    myCasesList: initialMyCasesListState,
    chatCase: initialChatCaseState,
    transferCase: initialTransferCaseState,
    historyAccess: initialHistoryAccessState,
    historyCase: initialHistoryCaseState,
    questionTemplate: initialQuestionTemplateState,
    paymentReceipts: initialPaymentReceiptsListState
};

const store = configureStore(appInitialState);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
