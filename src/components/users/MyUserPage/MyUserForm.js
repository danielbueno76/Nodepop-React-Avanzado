import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormField, Form, FormButton, ConfirmButton } from "../../shared";
import { deleteUserAction } from "../../../store/actions";
import { getOwnUserInfo } from "../../../store/selectors";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { useTranslation } from "react-i18next";

const MyUserForm = ({ onSubmit, ...props }) => {
  const [disabledUsername, setDisabledUsername] = useState(true);
  const [disabledEmail, setDisabledEmail] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const user = useSelector(getOwnUserInfo);
  const handleDeleteUser = () => {
    dispatch(deleteUserAction());
  };

  return user ? (
    <div className="box">
      <Form
        initialValue={{
          username: user.username,
          email: user.email,
          oldPassword: "",
          newPassword: "",
        }}
        onSubmit={onSubmit}
      >
        <FormField
          type="text"
          name="username"
          autofocus
          disabled={disabledUsername}
        />
        <Fab
          color="secondary"
          aria-label="Edit"
          onClick={() => setDisabledUsername(false)}
        >
          <EditIcon />
        </Fab>
        <br />
        <FormField type="text" name="email" disabled={disabledEmail} />
        <Fab
          color="secondary"
          aria-label="Edit"
          onClick={() => setDisabledEmail(false)}
        >
          <EditIcon />
        </Fab>
        <br />
        <FormField
          className="label"
          type="password"
          name="oldPassword"
          disabled={disabledPassword}
        />
        <FormField
          className="label"
          type="password"
          name="newPassword"
          disabled={disabledPassword}
        />
        <Fab
          color="secondary"
          aria-label="Edit"
          onClick={() => setDisabledPassword(false)}
        >
          <EditIcon />
        </Fab>
        <br />
        <FormButton type="submit" variant="primary" notDisabled>
          {t("save_changes")}
        </FormButton>
      </Form>
      <ConfirmButton
        type="submit"
        classname="button is-danger is-rounded m-4 p-4"
        messageConfirm={"Are you sure you want to delete your user?"}
        handleToDo={handleDeleteUser}
      >
        {t("delete_user")}
      </ConfirmButton>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default MyUserForm;
