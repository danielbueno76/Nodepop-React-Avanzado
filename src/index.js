import React from "react";
import ReactDOM from "react-dom";
import storage from "./utils/storage";
import { configureClient } from "./api/client";
import Root from "./Root";
import configureStore from "./store";
import { createBrowserHistory } from "history";
import "./styles/index.css";
import "bulma/css/bulma.min.css";

const accessToken = storage.get("auth");
configureClient({ accessToken });
const history = createBrowserHistory();
const store = configureStore({
  preloadedState: { auth: { isLogged: !!accessToken, username: null } },
  history,
});

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById("root")
);
