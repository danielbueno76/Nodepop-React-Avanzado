import React from "react";
import { FormContext } from "./Form";
import { useTranslation } from "react-i18next";

const Radio = ({ arrayValues, ...props }) => {
  const { formValue, handleChange } = React.useContext(FormContext);
  const { t } = useTranslation();

  return (
    <div className="control">
      {arrayValues.map((optionValue) => {
        return (
          <label key={optionValue} className="radio">
            <input
              type="radio"
              name={t(props.name)}
              value={optionValue}
              checked={optionValue === formValue[props.name]}
              onChange={handleChange}
              {...props}
            />
            {t(optionValue)}
          </label>
        );
      })}
    </div>
  );
};
export default Radio;
