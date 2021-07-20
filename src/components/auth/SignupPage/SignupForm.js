import React from "react";
import T from "prop-types";

import FormButton from "../../shared/FormButton";
import FormField from "../../shared/FormField";
import Form from "../../shared/Form";

function SignupForm({ onSubmit }) {
  return (
    <Form
      className="signupForm"
      initialValue={{
        username: "",
        email: "",
        password: "",
        remember: false,
      }}
      onSubmit={onSubmit}
    >
      <FormField
        className="label"
        type="email"
        name="email"
        autofocus
        autocomplete
      />
      <FormField
        className="label"
        type="text"
        name="username"
        autofocus
        autocomplete
      />
      <FormField className="label" type="password" name="password" />
      <FormButton type="submit" variant="primary">
        Sign up
      </FormButton>
    </Form>
  );
}

SignupForm.propTypes = {
  onSubmit: T.func.isRequired,
  isLoading: T.bool,
};

SignupForm.defaultProps = {
  isLoading: false,
};

export default SignupForm;
