import FormButton from "../shared/FormButton";
import FormField from "../shared/FormField";
import Form from "../shared/Form";
import { useTranslation } from "react-i18next";

const ResetPasswordForm = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Form
      className="resetPasswordForm"
      initialValue={{
        password: "",
      }}
      onSubmit={onSubmit}
    >
      <FormField className="label" type="password" name="password" />
      <FormButton type="submit" variant="primary">
        {t("change_password")}
      </FormButton>
    </Form>
  );
};

export default ResetPasswordForm;
