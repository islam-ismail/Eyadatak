import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// import "./index.scss";
import "./app/css/app.css";
import App from "./app/App";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/util/ScrollToTop";

const store = configureStore();

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
