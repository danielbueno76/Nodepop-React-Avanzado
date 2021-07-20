import React from "react";
import LoginForm from "./LoginForm";
import MessagePage from "../../message";
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
      <h1 className="loginPage-title title">
        Log in to Nodepop to access further features!
      </h1>
      <LoginForm onSubmit={handleSubmit} />
      <MessagePage />
    </div>
  );
}

export default LoginPage;
