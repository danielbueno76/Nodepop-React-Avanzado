import React from "react";
import { FormContext } from "./Form";

const Select = ({ allTags, ...props }) => {
  const { formValue, handleChange } = React.useContext(FormContext);
  return (
    <label className="label">
      <span>{props.name}</span>
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
