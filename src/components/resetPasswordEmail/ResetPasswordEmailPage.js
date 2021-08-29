import { useDispatch } from "react-redux";
import { sendEmailAction, signEmailAction } from "../../store/actions";
import ResetPasswordEmailForm from "./ResetPasswordEmailForm";
import ErrorPage from "../message/ErrorPage";
import Layout from "../layout/Layout";
import { useTranslation } from "react-i18next";

function ResetPasswordEmailPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSubmit = async ({ email }) => {
    const { token } = await dispatch(signEmailAction(email));
    dispatch(
      sendEmailAction({
        email,
        subject: t("subject_email_reset_password"),
        body: t("body_email_reset_password", {
          url: window.location.origin + "/resetPassword",
          token,
        }),
      })
    );
  };

  return (
    <Layout notButtons>
      <div className="generalPage">
        <h1 className="generalPage-title title">{t("send_email_intro")}</h1>
        <ResetPasswordEmailForm onSubmit={handleSubmit} />
        <ErrorPage />
      </div>
    </Layout>
  );
}

export default ResetPasswordEmailPage;
