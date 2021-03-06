import React from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, SignupPage, PrivateRoute } from "./components/auth";
import {
  AdvertsPage,
  AdvertPage,
  NewAdvertPage,
  AdvertEditPage,
} from "./components/adverts";
import { NotFoundPage } from "./components/notFound";
import { ResetPasswordPage } from "./components/resetPassword";
import { ResetPasswordEmailPage } from "./components/resetPasswordEmail";
import { UserPage, MyUserPage } from "./components/users/";
import { authGetOwnUserAction } from "./store/actions";
import storage from "./utils/storage";

function App() {
  const dispatch = useDispatch();
  const accessToken = storage.get("auth");

  React.useEffect(() => {
    if (accessToken) dispatch(authGetOwnUserAction());
  }, [dispatch, accessToken]);

  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/resetPasswordSendEmail">
          <ResetPasswordEmailPage />
        </Route>
        <Route path="/resetPassword">
          <ResetPasswordPage />
        </Route>
        <PrivateRoute exact path="/advert/new">
          <NewAdvertPage />
        </PrivateRoute>
        <Route exact path="/advert/:advertId">
          {(routeProps) => <AdvertPage {...routeProps} />}
        </Route>
        <PrivateRoute exact path="/advert/:advertId/edit">
          {(routeProps) => <AdvertEditPage {...routeProps} />}
        </PrivateRoute>
        <Route path="/adverts">
          <AdvertsPage />
        </Route>
        <Route path="/user/:username">
          {(routeProps) => <UserPage {...routeProps} />}
        </Route>
        <PrivateRoute path="/myuser">
          <MyUserPage />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/adverts" />
        </Route>
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
