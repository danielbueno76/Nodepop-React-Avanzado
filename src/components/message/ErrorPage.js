import { getUi } from "../../store/selectors";
import { resetError } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  let { error } = useSelector(getUi);
  const dispatch = useDispatch();
  const handleResetError = () => {
    dispatch(resetError());
  };
  return (
    error && (
      <div className="container mt-4">
        <div className="notification is-danger">
          <button className="delete" onClick={handleResetError}></button>
          {error ? t(error.errorCause) : {}}
        </div>
      </div>
    )
  );
};

export default ErrorPage;
