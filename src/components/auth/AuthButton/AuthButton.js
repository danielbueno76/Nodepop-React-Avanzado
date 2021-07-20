import T from "prop-types";
import { ConfirmButton } from "../../shared";
import { getIsLogged } from "../../../store/selectors";
import { logoutAction } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const AuthButton = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  const props = isLogged
    ? { handleToDo: handleLogoutClick, children: "Log out" }
    : {
        toLogin: "/login",
        children: "Log in",
        toSignup: "/signup",
        signup: "Sign up",
      };

  return (
    <ConfirmButton
      classname="button is-danger is-rounded"
      messageConfirm={"Are you sure you want to log out?"}
      {...props}
    />
  );
};

AuthButton.propTypes = {
  className: T.string,
};

export default AuthButton;
