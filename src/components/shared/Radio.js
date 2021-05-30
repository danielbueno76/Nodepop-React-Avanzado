import React from "react";
import { FormContext } from "./Form";

const Radio = ({ arrayValues, ...props }) => {
  const { formValue, handleChange } = React.useContext(FormContext);

  return (
    <div className="control">
      {arrayValues.map((optionValue) => {
        return (
          <label key={optionValue} className="radio">
            <input
              type="radio"
              name={props.name}
              value={optionValue}
              checked={optionValue === formValue[props.name]}
              onChange={handleChange}
              {...props}
            />
            {optionValue}
          </label>
        );
      })}
    </div>
  );
};
export default Radio;
