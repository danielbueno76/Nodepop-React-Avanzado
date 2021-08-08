import React from "react";
import SignupForm from "./SignupForm";
import ErrorPage from "../../message/ErrorPage";
import { signupAction } from "../../../store/actions";
import { useDispatch } from "react-redux";
import "../../../styles/GeneralPage.css";

function SignupPage() {
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(signupAction(credentials));
  };

  return (
    <div className="generalPage">
      <h1 className="generalPage-title">Sign up in to Nodepop</h1>
      <SignupForm onSubmit={handleSubmit} />
      <ErrorPage />
    </div>
  );
}

export default SignupPage;
