import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import noteReducer from "./reducers/noteReducer";
import { BrowserRouter as Router} from 'react-router-dom';

window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(noteReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}><App /></Router>
  </Provider>,
  document.getElementById("root")
);
