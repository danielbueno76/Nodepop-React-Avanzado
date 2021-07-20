import { getUi } from "../../store/selectors";
import { resetError } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const MessagePage = () => {
  const { error, messageSuccess } = useSelector(getUi);
  const dispatch = useDispatch();
  console.log(error, messageSuccess);
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
          {error ? error.errorCause : messageSuccess}
        </div>
      </div>
    )
  );
};

export default MessagePage;
