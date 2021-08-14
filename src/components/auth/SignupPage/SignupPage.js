import React from "react";
import SignupForm from "./SignupForm";
import ErrorPage from "../../message/ErrorPage";
import { signupAction } from "../../../store/actions";
import Layout from "../../layout/Layout";
import { useDispatch } from "react-redux";
import "../../../styles/GeneralPage.css";

function SignupPage() {
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(signupAction(credentials));
  };

  return (
    <Layout notButtons>
      <div className="generalPage">
        <h1 className="generalPage-title">Sign up in to Nodepop</h1>
        <SignupForm onSubmit={handleSubmit} />
        <ErrorPage />
      </div>
    </Layout>
  );
}

export default SignupPage;
