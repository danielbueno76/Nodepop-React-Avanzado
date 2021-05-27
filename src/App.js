import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, PrivateRoute } from "./components/auth";
import { AdvertsPage, AdvertPage, NewAdvertPage } from "./components/adverts";
import { NotFoundPage } from "./components/notFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute exact path="/advert/new">
          <NewAdvertPage />
        </PrivateRoute>
        <PrivateRoute path="/advert/:advertId">
          {(routeProps) => <AdvertPage {...routeProps} />}
        </PrivateRoute>
        <PrivateRoute path="/adverts">
          <AdvertsPage />
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Redirect to="/adverts" />
        </PrivateRoute>
        <Route path="/404">
          <NotFoundPage />
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
