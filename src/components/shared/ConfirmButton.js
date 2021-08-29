import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        {t(signup)}
      </Link>
      <Link className={classname} to={toLogin} {...props}>
        {t(login)}
      </Link>
    </>
  );
};
export default ConfirmButton;
