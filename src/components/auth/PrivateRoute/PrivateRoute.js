import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLogged } from "../../../store/selectors";

const PrivateRoute = (props) => {
  const isLogged = useSelector(getIsLogged);
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route {...props}>
      {({ location }) => (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
