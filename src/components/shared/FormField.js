import React from "react";

function FormField({ label, autofocus, autocomplete, ...props }) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (autofocus) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  return (
    <label className="label">
      <span>{label}</span>
      <input
        ref={inputRef}
        className="input"
        autoComplete={autocomplete ? "on" : "off"}
        {...props}
      />
    </label>
  );
}

export default FormField;
