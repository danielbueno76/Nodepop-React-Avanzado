import React from "react";
import Button from "./Button";
import { FormContext } from "./Form";

const ClearButton = ({ ...props }) => {
  const { setFormValue } = React.useContext(FormContext);

  const handleClearFilter = () => {
    setFormValue({
      name: "",
      price: [],
      tags: [],
    });
  };
  return <Button {...props} onClick={handleClearFilter} />;
};

export default ClearButton;
