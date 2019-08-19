import { applyMiddleware, compose, createStore, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import refreshTokenMiddleware from "../middlewares/refreshTokenMiddleware";
import rootReducer, { AppState } from "../reducers/rootReducer";

export const configureStore = (preloadedState?: AppState) => {
    const middlewares = [refreshTokenMiddleware, thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];
    let composedEnhancer: StoreEnhancer;

    if (process.env.NODE_ENV !== "production") {
        composedEnhancer = composeWithDevTools(...storeEnhancers);
    } else {
        composedEnhancer = compose(...storeEnhancers);
    }

    const store = createStore(rootReducer, preloadedState, composedEnhancer);

    return store;
};
