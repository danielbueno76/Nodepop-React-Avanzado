import React from "react";
import T from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, PrivateRoute } from "./components/auth";
import { AdvertsPage, AdvertPage, NewAdvertPage } from "./components/adverts";
import { AuthContextProvider } from "./components/auth/context";
import { NotFoundPage } from "./components/notFound";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  return (
    <div className="App">
      <AuthContextProvider value={authValue}>
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
      </AuthContextProvider>
    </div>
  );
}

App.propTypes = {
  isInitiallyLogged: T.bool.isRequired,
};

export default App;
