import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Col } from "react-bootstrap";
import { Provider } from "react-redux";
// import ErrorBoundary from "./components/ErrorBoundary";
import {
  Router,
  Route,
  Link,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import { getStore, init as storeInit } from "./redux/store";
import history from "./history";
import "./App.css";
import UsersList from "./components/UsersList";
import UserDashboard from "./components/UserDashboard";

const getInitiatedStore = () => {
  storeInit();
  return getStore();
};

const store = getInitiatedStore();

const app = () => (
  <Provider store={store}>
    <Suspense fallback={"Loading..."}>
      <Router history={history}>
        <Col md={10} mdOffset={1} xs={12}>
          <Route path="/" exact component={UsersList} />
          <Route path="/user/:username" component={UserDashboard} />
        </Col>
      </Router>
    </Suspense>
  </Provider>
);

ReactDOM.render(app(), document.getElementById("root"));
