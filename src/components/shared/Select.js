import React from "react";
import { FormContext } from "./Form";
import { useTranslation } from "react-i18next";

const Select = ({ allTags, ...props }) => {
  const { t } = useTranslation();

  const { formValue, handleChange } = React.useContext(FormContext);
  return (
    <label className="label">
      <span>{t(props.name)}</span>
      <br />
      <div className="select is-multiple">
        <select
          multiple
          size={allTags.length}
          onChange={handleChange}
          {...props}
        >
          {allTags.length &&
            allTags.map((tag) => {
              return (
                <option
                  key={tag}
                  value={tag}
                  selected={formValue[props.name].includes(tag)}
                >
                  {tag}
                </option>
              );
            })}
        </select>
      </div>
    </label>
  );
};
export default Select;
