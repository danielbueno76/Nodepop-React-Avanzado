import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const PriceSlider = ({
  label,
  name,
  min,
  max,
  onChangeMin,
  onChangeMax,
  value,
  ...props
}) => {
  return (
    <label className="label">
      <span>{label}</span>
      <br />
      <label>
        Min:
        <input
          className="input"
          name={name}
          type="number"
          value={value[0]}
          min={min}
          max={max}
          onChange={onChangeMin}
        />
      </label>
      <label>
        Max:
        <input
          className="input"
          name={name}
          type="number"
          value={value[1]}
          min={min}
          max={max}
          onChange={onChangeMax}
        />
      </label>

      <Range
        steps={0.1}
        min={min}
        max={max}
        value={value}
        name={name}
        {...props}
      />
    </label>
  );
};

export default PriceSlider;
