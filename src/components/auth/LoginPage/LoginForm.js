import React from "react";
import T from "prop-types";

import Button from "../../shared/Button";
import FormField from "../../shared/FormField";
import Checkbox from "../../shared/Checkbox";
import useForm from "../../../hooks/useForm";

function LoginForm({ onSubmit, isLoading }) {
  const [credentials, handleChange, handleSubmit] = useForm({
    email: "",
    password: "",
  });
  const [isChecked, setisChecked] = React.useState(false);

  const handleFormSubmit = (ev) => {
    onSubmit(credentials, isChecked);
  };

  const handleChecked = (ev) => {
    setisChecked(ev.target.checked);
  };

  const { email, password } = credentials;

  return (
    <form className="loginForm" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormField
        type="text"
        name="email"
        label="email"
        value={email}
        onChange={handleChange}
        autofocus
        autocomplete
      />
      <FormField
        type="password"
        name="password"
        label="password"
        value={password}
        onChange={handleChange}
      />
      <Checkbox
        name="remember"
        label="remember"
        value={isChecked}
        onChange={handleChecked}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading || !email || !password}
      >
        Log in
      </Button>
    </form>
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
