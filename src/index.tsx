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
import XXX from "./components/UsersList";
import WWW from "./components/UserDashboard";
const UsersList = lazy(() => import("./components/UsersList"));
const UserDashboard = lazy(() => import("./components/UserDashboard"));

const P = (
  <div>
    aaaaa...
    <Suspense fallback={<div>Loading!!! </div>}>
      <UsersList />
    </Suspense>
  </div>
);

const getInitiatedStore = () => {
  storeInit();
  return getStore();
};

const store = getInitiatedStore();

const app = () => (
  <Provider store={store}>
    <Suspense fallback={"Loading..."}>
      <Router history={history}>
        <Col xs={10} xsOffset={1}>
          <Route path="/" exact component={XXX} />
          <Route path="/user/:username" component={WWW} />
        </Col>
      </Router>
    </Suspense>
  </Provider>
);

ReactDOM.render(app(), document.getElementById("root"));
