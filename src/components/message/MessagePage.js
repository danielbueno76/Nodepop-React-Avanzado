import { getUi } from "../../store/selectors";
import { resetError } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MessagePage = () => {
  const { t } = useTranslation();
  const { error, messageSuccess } = useSelector(getUi);
  const dispatch = useDispatch();
  const handleResetError = () => {
    dispatch(resetError());
  };
  return (
    (error || messageSuccess) && (
      <div className="container mt-4">
        <div
          className={
            error ? "notification is-danger" : "notification is-primary"
          }
        >
          <button className="delete" onClick={handleResetError}></button>
          {error ? t(error.errorCause) : t(messageSuccess)}
        </div>
      </div>
    )
  );
};

export default MessagePage;
