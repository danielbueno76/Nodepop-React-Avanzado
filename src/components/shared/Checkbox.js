import React from "react";

const Checkbox = ({ ...props }) => {
  return (
    <label className="checkbox">
      <input type="checkbox" {...props} />
      Remember me
    </label>
  );
};

export default Checkbox;
