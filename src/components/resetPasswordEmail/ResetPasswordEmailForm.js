import FormButton from "../shared/FormButton";
import FormField from "../shared/FormField";
import Form from "../shared/Form";

const ResetPasswordEmailForm = ({ onSubmit }) => {
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
        Send email to change password
      </FormButton>
    </Form>
  );
};

export default ResetPasswordEmailForm;
