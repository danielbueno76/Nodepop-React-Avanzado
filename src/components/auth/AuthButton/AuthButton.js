import T from "prop-types";
import { Link } from "react-router-dom";
import { ConfirmButton } from "../../shared";
import { getIsLogged } from "../../../store/selectors";
import { logoutAction } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const AuthButton = ({ className }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  const props = isLogged
    ? { onClick: handleLogoutClick, children: "Log out" }
    : {
        as: Link,
        to: "/login",
        children: "Log in",
      };

  return (
    <ConfirmButton
      className={className}
      messageConfirm={"Are you sure you want to log out?"}
      handleToDo={handleLogoutClick}
      {...props}
    />
  );
};

AuthButton.propTypes = {
  className: T.string,
};

export default AuthButton;
