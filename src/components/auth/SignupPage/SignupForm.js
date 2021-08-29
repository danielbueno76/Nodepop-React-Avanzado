import React from "react";
import T from "prop-types";
import FormButton from "../../shared/FormButton";
import FormField from "../../shared/FormField";
import Form from "../../shared/Form";
import { useTranslation } from "react-i18next";

function SignupForm({ onSubmit }) {
  const { t } = useTranslation();

  return (
    <Form
      className="signupForm"
      initialValue={{
        username: "",
        email: "",
        password: "",
        repeat_password: "",
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
      <FormField className="label" type="text" name="username" autocomplete />
      <FormField className="label" type="password" name="password" />
      <FormField className="label" type="password" name="repeat_password" />
      <FormButton type="submit" variant="primary">
        {t("signup")}
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
