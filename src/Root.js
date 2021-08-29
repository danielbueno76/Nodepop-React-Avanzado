import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "connected-react-router";
import App from "./App";

function Root({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Suspense fallback="...is loading">
          <App />
        </Suspense>
      </Router>
    </Provider>
  );
}

export default Root;
