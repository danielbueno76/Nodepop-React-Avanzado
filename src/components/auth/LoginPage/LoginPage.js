import React from "react";
import LoginForm from "./LoginForm";
import ErrorPage from "../../message/ErrorPage";
import { loginAction } from "../../../store/actions";
import { useDispatch } from "react-redux";
import Layout from "../../layout/Layout";
import "../../../styles/GeneralPage.css";

function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(loginAction(credentials));
  };

  return (
    <Layout notButtons>
      <div className="generalPage">
        <h1 className="generalPage-title title">
          Log in to Nodepop to access further features!
        </h1>
        <LoginForm onSubmit={handleSubmit} />
        <ErrorPage />
      </div>
    </Layout>
  );
}

export default LoginPage;
