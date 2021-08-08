import { useDispatch } from "react-redux";
import { sendEmailAction } from "../../store/actions";
import ResetPasswordEmailForm from "./ResetPasswordEmailForm";
import MessagePage from "../message";

function ResetPasswordEmailPage() {
  const dispatch = useDispatch();

  const handleSubmit = (email) => {
    dispatch(sendEmailAction(email));
  };

  return (
    <div className="generalPage">
      <h1 className="generalPage-title title">
        Introduce email to change password
      </h1>
      <ResetPasswordEmailForm onSubmit={handleSubmit} />
      <MessagePage />
    </div>
  );
}

export default ResetPasswordEmailPage;
