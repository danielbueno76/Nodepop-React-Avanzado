import React from "react";
import { FormContext } from "./Form";
import { useTranslation } from "react-i18next";

function FormField({ className, autofocus, autocomplete, ...props }) {
  const { t } = useTranslation();

  const { formValue, handleChange } = React.useContext(FormContext);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (autofocus) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  return (
    <label className={className}>
      <span>{t(props.name)}</span>
      <br />
      {props.type !== "textarea" ? (
        <input
          ref={inputRef}
          className={props.type === "checkbox" ? "" : "input"}
          autoComplete={autocomplete ? "on" : "off"}
          onChange={handleChange}
          value={props.type === "file" ? undefined : formValue[props.name]}
          placeholder={t(props.name)}
          {...props}
        />
      ) : (
        <textarea
          className="textarea"
          onChange={handleChange}
          value={formValue[props.name]}
          placeholder={t(props.name)}
          {...props}
        />
      )}
    </label>
  );
}

export default FormField;
