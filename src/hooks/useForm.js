import React from "react";

const useForm = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event) => {
    let valueEvent = event.target.value;
    if (event.target.selectedOptions) {
      // select component
      valueEvent = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
    } else if (event.target.files) {
      //input type file
      valueEvent = event.target.files[0];
    }
    setValue((oldValue) => ({
      ...oldValue,
      [event.target.name]: valueEvent,
    }));
  };

  const handleSubmit = (afterPreventDefault) => {
    return (ev) => {
      ev.preventDefault();
      afterPreventDefault(ev);
    };
  };

  return [value, handleChange, handleSubmit];
};

export default useForm;
