import React from "react";
import LoginForm from "./LoginForm";
import ErrorPage from "../../message/ErrorPage";
import { loginAction } from "../../../store/actions";
import { useDispatch } from "react-redux";
import "../../../styles/GeneralPage.css";

function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials));
  };

  return (
    <div className="generalPage">
      <h1 className="generalPage-title title">
        Log in to Nodepop to access further features!
      </h1>
      <LoginForm onSubmit={handleSubmit} />
      <ErrorPage />
    </div>
  );
}

export default LoginPage;
