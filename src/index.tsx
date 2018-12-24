import React from "react";
import ReactDOM from "react-dom";
import { Col } from "react-bootstrap";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";

import { getStore, init as storeInit } from "./redux/store";
import history from "./history";
import UsersList from "./components/UsersList";
import UserDashboard from "./components/UserDashboard";
import "./app.css";

const getInitiatedStore = () => {
  storeInit();
  return getStore();
};

const store = getInitiatedStore();

const app = () => (
  <Provider store={store}>
    <Router history={history}>
      <Col md={10} mdOffset={1} xs={12}>
        <Route path="/" exact component={UsersList} />
        <Route path="/user/:username" component={UserDashboard} />
      </Col>
    </Router>
  </Provider>
);

ReactDOM.render(app(), document.getElementById("root"));
