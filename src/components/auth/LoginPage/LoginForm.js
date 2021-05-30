import React from "react";
import T from "prop-types";

import FormButton from "../../shared/FormButton";
import FormField from "../../shared/FormField";
import Form from "../../shared/Form";

function LoginForm({ onSubmit }) {
  return (
    <Form
      className="loginForm"
      initialValue={{
        email: "",
        password: "",
        remember: false,
      }}
      onSubmit={onSubmit}
    >
      <FormField
        className="label"
        type="text"
        name="email"
        autofocus
        autocomplete
      />
      <FormField className="label" type="password" name="password" />
      <FormField className="checkbox" type="checkbox" name="remember" />
      <FormButton type="submit" variant="primary">
        Log in
      </FormButton>
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
