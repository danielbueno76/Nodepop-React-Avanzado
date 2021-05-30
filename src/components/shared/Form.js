import React from "react";
import useForm from "../../hooks/useForm";

export const FormContext = React.createContext();

function Form({ onSubmit, initialValue, children, ...props }) {
  const { formValue, setFormValue, handleChange, handleSubmit, validate } =
    useForm(initialValue);

  const handleFormSubmit = () => {
    onSubmit(formValue);
  };

  return (
    <FormContext.Provider
      value={{ formValue, setFormValue, handleChange, validate }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
