import React from "react";
import LoginForm from "./LoginForm";
import { login } from "../../../api/auth";

import "./LoginPage.css";
import { useAuthContext } from "../context";
import { useHistory, useLocation } from "react-router";

function LoginPage() {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const isLogged = React.useRef(false);

  const resetError = React.useCallback(() => setError(), []);
  const history = useHistory();
  const location = useLocation();
  const { onLogin } = useAuthContext();

  React.useEffect(() => {
    if (isLogged.current) {
      onLogin();
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  });

  const handleSubmit = async (credentials, storeCredentials = false) => {
    resetError();
    setIsLoading(true);
    try {
      await login(credentials, storeCredentials);
      isLogged.current = true;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
