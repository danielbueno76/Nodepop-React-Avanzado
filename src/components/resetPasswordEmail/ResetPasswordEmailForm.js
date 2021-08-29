import FormButton from "../shared/FormButton";
import FormField from "../shared/FormField";
import Form from "../shared/Form";
import { useTranslation } from "react-i18next";

const ResetPasswordEmailForm = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Form
      className="resetPasswordEmailForm"
      initialValue={{
        email: "",
      }}
      onSubmit={onSubmit}
    >
      <FormField className="label" type="email" name="email" />
      <FormButton type="submit" variant="primary">
        {t("send_email_password")}
      </FormButton>
    </Form>
  );
};

export default ResetPasswordEmailForm;
