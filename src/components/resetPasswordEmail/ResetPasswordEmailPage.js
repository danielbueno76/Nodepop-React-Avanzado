import { useDispatch } from "react-redux";
import { sendEmailAction } from "../../store/actions";
import ResetPasswordEmailForm from "./ResetPasswordEmailForm";
import ErrorPage from "../message/ErrorPage";
import Layout from "../layout/Layout";

function ResetPasswordEmailPage() {
  const dispatch = useDispatch();

  const handleSubmit = (email) => {
    dispatch(sendEmailAction(email));
  };

  return (
    <Layout notButtons>
      <div className="generalPage">
        <h1 className="generalPage-title title">
          Introduce email to change password
        </h1>
        <ResetPasswordEmailForm onSubmit={handleSubmit} />
        <ErrorPage />
      </div>
    </Layout>
  );
}

export default ResetPasswordEmailPage;
