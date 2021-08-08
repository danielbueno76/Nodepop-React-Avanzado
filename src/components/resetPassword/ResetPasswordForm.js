import FormButton from "../shared/FormButton";
import FormField from "../shared/FormField";
import Form from "../shared/Form";

const ResetPasswordForm = ({ onSubmit }) => {
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
        Change Password
      </FormButton>
    </Form>
  );
};

export default ResetPasswordForm;
