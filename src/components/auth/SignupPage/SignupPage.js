import React from "react";
import SignupForm from "./SignupForm";
import ErrorPage from "../../error";
import { signupAction } from "../../../store/actions";
import { useDispatch } from "react-redux";
import "./SignupPage.css";

function SignupPage() {
  const dispatch = useDispatch();

  const handleSubmit = (credentials) => {
    dispatch(signupAction(credentials));
  };

  return (
    <div className="signupPage">
      <h1 className="signupPage-title">Sign up in to Nodepop</h1>
      <SignupForm onSubmit={handleSubmit} />
      <ErrorPage />
    </div>
  );
}

export default SignupPage;
