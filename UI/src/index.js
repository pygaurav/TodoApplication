import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import TodoReducer from "./reducer/todoreducer/TodoReducer";
import AlertReducer from "./reducer/alertreducer/AlertReducer";
const rootElement = document.getElementById("root");

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const FinalReducer = combineReducers({
  alert: AlertReducer,
  todo: TodoReducer
});
const store = createStore(
  FinalReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
