import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = composeWithDevTools(applyMiddleware(thunk));

const initialState = {};

const store = createStore(rootReducer, initialState, middleware);

export default store;
