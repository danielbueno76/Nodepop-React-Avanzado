import React from "react";
import LoginForm from "./LoginForm";
import { getUi } from "../../../store/selectors";
import { loginAction, resetError } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials));
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
