import { Link } from "react-router-dom";

const ConfirmButton = ({
  children,
  signup,
  login,
  classname,
  messageConfirm,
  handleToDo,
  toLogin,
  toSignup,
  ...props
}) => {
  return handleToDo ? (
    <button
      className={classname}
      onClick={() => {
        const deleteConfirmed = window.confirm(messageConfirm);
        if (deleteConfirmed) {
          handleToDo();
        }
      }}
      {...props}
    >
      {children}
    </button>
  ) : (
    <>
      <Link className={classname} to={toSignup} {...props}>
        {signup}
      </Link>
      <Link className={classname} to={toLogin} {...props}>
        {login}
      </Link>
    </>
  );
};
export default ConfirmButton;
