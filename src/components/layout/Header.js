import React from "react";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Icon } from "../../images/Logo.svg";
import AuthButton from "../auth/AuthButton";
import Button from "../shared/Button";
import "./Header.css";

const Header = ({ className, ...props }) => {
  return (
    <header className={classNames("header", className)} {...props}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="50%" height="50%" />
        </div>
      </Link>
      <nav className="header-nav">
        <Button
          as={NavLink}
          activeClassName="active"
          to="/advert/new"
          variant="primary"
          className="header-button"
        >
          Create ad
        </Button>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
};

export default Header;
