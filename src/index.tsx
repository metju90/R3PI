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

const UsersList = lazy(() => import("./components/UsersList"));
const UserDetails = lazy(() => import("./components/UserDetails"));

const getInitiatedStore = () => {
  storeInit();
  return getStore();
};

const store = getInitiatedStore();

const app = () => (
  <Provider store={store}>
    <Suspense fallback={"Loading..."}>
      <Router history={history}>
        <Col xs={8} xsOffset={2}>
          <Route path="/" exact component={UsersList} />
          <Route path="/user/:username" component={UserDetails} />
        </Col>
      </Router>
    </Suspense>
  </Provider>
);

ReactDOM.render(app(), document.getElementById("root"));
