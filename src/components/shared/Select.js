import React from "react";

const Select = ({ label, allTags, ...props }) => {
  return (
    <label className="label">
      <span>{label}</span>
      <br />
      <div className="select is-multiple">
        <select multiple size={allTags.length} {...props}>
          {allTags.length &&
            allTags.map((tag) => {
              return (
                <option key={tag} value={tag}>
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
