import React from "react";
import Button from "./Button";
import { FormContext } from "./Form";
import { keyToObjectValidate } from "../../utils/utils";

const FormButton = ({ notDisabled, ...props }) => {
  const { formValue, validate } = React.useContext(FormContext);
  const formFunction = notDisabled ? [] : keyToObjectValidate(formValue);
  return <Button {...props} disabled={!validate(formFunction)} />; // validate only works form loginform
};

export default FormButton;
