import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthButton from "../auth/AuthButton";
import "../../styles/Header.css";

const Header = ({ notButtons, ...props }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/">
          <img
            src={process.env.REACT_APP_API_BASE_URL + "/images/wallaclone.png"}
            alt="logo"
            width="300"
            height="300"
          />
        </NavLink>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {notButtons ? (
              <React.Fragment />
            ) : (
              <React.Fragment>
                <Link to="/advert/new" className="button is-danger is-rounded">
                  Create ad
                </Link>
                <AuthButton />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
