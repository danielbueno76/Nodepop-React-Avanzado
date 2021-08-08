import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { resetPasswordAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import MessagePage from "../message";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const query = useQuery();
  const handleSubmit = ({ password }) => {
    dispatch(resetPasswordAction(query.get("token"), password));
  };
  return (
    <div className="generalPage">
      <h1 className="generalPage-title title">
        Introduce email to change password
      </h1>
      <ResetPasswordForm onSubmit={handleSubmit} />
      <MessagePage />
    </div>
  );
}

export default ResetPasswordPage;
