const Radio = ({ arrayValues, value, ...props }) => {
  return (
    <div className="control">
      {arrayValues.map((optionValue) => {
        return (
          <label key={optionValue} className="radio">
            <input
              type="radio"
              name="sale"
              value={optionValue}
              checked={optionValue === value}
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
