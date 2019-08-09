import { getJWT, isTokenExpired } from "../util/helpersFunc";
import { Middleware } from "redux";

const refreshTokenMiddleware: Middleware = store => next => action => {
    if (!action.excludeRefresh && (action.type && !action.type.includes("@@redux-form"))) {
        // console.log(
        //     "Hello from refresh middleware: the middleware is working",
        //     action.type
        // );
        const token = getJWT();
        if (token) {
            if (isTokenExpired(token)) {
                // console.log(
                //     "Hello from refresh middleware: the token is expired",
                //     action.type
                // );
                next(action);
            } else {
                next(action);
            }
        } else {
            next(action);
        }
    } else {
        next(action);
    }
};

export default refreshTokenMiddleware;
