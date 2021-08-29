import T from "prop-types";
import { ConfirmButton } from "../../shared";
import { getIsLogged } from "../../../store/selectors";
import { logoutAction } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AuthButton = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const { t } = useTranslation();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  const props = isLogged
    ? { handleToDo: handleLogoutClick, children: "Log out" }
    : {
        toLogin: "/login",
        login: "login",
        toSignup: "/signup",
        signup: "signup",
      };

  return (
    <ConfirmButton
      classname="button is-danger is-rounded"
      messageConfirm={t("confirm_logout")}
      {...props}
    />
  );
};

AuthButton.propTypes = {
  className: T.string,
};

export default AuthButton;
