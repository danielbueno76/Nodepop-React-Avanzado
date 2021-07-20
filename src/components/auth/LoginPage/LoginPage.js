import React from "react";
import LoginForm from "./LoginForm";
import ErrorPage from "../../error";
import { loginAction } from "../../../store/actions";
import { useDispatch } from "react-redux";
import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials));
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <LoginForm onSubmit={handleSubmit} />
      <ErrorPage />
    </div>
  );
}

export default LoginPage;
