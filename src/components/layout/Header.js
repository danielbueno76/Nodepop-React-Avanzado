import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthButton from "../auth/AuthButton";
import "../../styles/Header.css";
import { getIsLogged } from "../../store/selectors";
import { changeLanguageAction } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../shared";
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

const Header = ({ notButtons, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const handleChangeLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
    dispatch(changeLanguageAction(e.target.value));
  };
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
            <Button value="en" onClick={handleChangeLanguage}>
              {t("english")}
            </Button>
            <Button value="es" onClick={handleChangeLanguage}>
              {t("spanish")}
            </Button>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {isLogged ? (
              <Link to="/myuser" className="button is-danger is-rounded">
                {t("private_page")}
              </Link>
            ) : (
              <React.Fragment />
            )}
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {notButtons ? (
              <React.Fragment />
            ) : (
              <React.Fragment>
                <Link to="/advert/new" className="button is-danger is-rounded">
                  {t("create_ad")}
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
