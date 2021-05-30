import React from "react";
import { FormContext } from "./Form";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const PriceSlider = ({ name, min, max, ...props }) => {
  const { formValue, handleChange } = React.useContext(FormContext);
  const handleSliderChange = ([minValue, maxValue]) => {
    handleChange({
      target: { name, value: [minValue || min, maxValue || max] },
    });
  };
  return (
    <label className="label">
      <span>{name}</span>
      <Range
        name={name}
        min={min}
        max={max}
        value={formValue[name]}
        onChange={handleSliderChange}
        {...props}
      />
      <br />
    </label>
  );
};

export default PriceSlider;
