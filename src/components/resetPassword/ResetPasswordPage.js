import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { resetPasswordAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import MessagePage from "../message";
import Layout from "../layout/Layout";
import { useTranslation } from "react-i18next";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPasswordPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const handleSubmit = ({ password }) => {
    dispatch(resetPasswordAction(query.get("token"), password));
  };
  return (
    <Layout notButtons>
      <div className="generalPage">
        <h1 className="generalPage-title title">{t("reset_password_intro")}</h1>
        <ResetPasswordForm onSubmit={handleSubmit} />
        <MessagePage />
      </div>
    </Layout>
  );
}

export default ResetPasswordPage;
