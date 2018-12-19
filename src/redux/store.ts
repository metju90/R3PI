/* global window */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

let store: any;

const init = () => {
  const params = [reducers];
  const enhancers = [applyMiddleware(thunk)];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  params.push(window.__PRELOADED_STATE__);
  //@ts-ignore
  store = compose(...enhancers)(createStore)(...params);

  store.replaceReducer(reducers);
};

const getStore = () => store;

export { getStore, init };
