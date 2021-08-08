import React from "react";
import T from "prop-types";
import { Link } from "react-router-dom";

import { FormButton, FormField, Form } from "../../shared";

function LoginForm({ onSubmit }) {
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
        Log in
      </FormButton>
      <Link to="/resetPasswordSendEmail" variant="primary">
        Reset Password
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
