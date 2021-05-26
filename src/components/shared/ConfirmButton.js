import { Button } from "../shared";

const ConfirmButton = ({ children, messageConfirm, handleToDo, ...props }) => {
  return (
    <Button
      className="button is-danger"
      onClick={() => {
        const deleteConfirmed = window.confirm(messageConfirm);
        if (deleteConfirmed) {
          handleToDo();
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
export default ConfirmButton;
