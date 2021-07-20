import { getUi } from "../../store/selectors";
import { resetError } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const ErrorPage = () => {
  const { messageSuccess } = useSelector(getUi);
  const dispatch = useDispatch();

  const handleResetError = () => {
    dispatch(resetError());
  };
  return (
    messageSuccess && (
      <div className="container mt-4">
        <div className="notification is-primary">
          <button className="delete" onClick={handleResetError}></button>
          {messageSuccess}
        </div>
      </div>
    )
  );
};

export default ErrorPage;
