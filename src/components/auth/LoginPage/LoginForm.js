import React from "react";
import T from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormButton, FormField, Form } from "../../shared";

function LoginForm({ onSubmit }) {
  const { t } = useTranslation();

  return (
    <Form
      className="loginForm"
      initialValue={{
        username: "",
        password: "",
        remember: false,
      }}
      onSubmit={onSubmit}
    >
      <FormField
        className="label"
        type="text"
        name="username"
        autofocus
        autocomplete
      />
      <FormField className="label" type="password" name="password" />
      <FormField className="checkbox" type="checkbox" name="remember" />
      <FormButton type="submit" variant="primary">
        {t("login")}
      </FormButton>
      <Link to="/resetPasswordSendEmail" variant="primary">
        {t("reset_password")}
      </Link>
    </Form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
  isLoading: T.bool,
};

LoginForm.defaultProps = {
  isLoading: false,
};

export default LoginForm;
