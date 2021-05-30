import React from "react";
import { FormField, Radio, Select, Form, FormButton } from "../../shared";
import { BUY, SELL } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { advertsTagsAction } from "../../../store/actions";
import { getTags } from "../../../store/selectors";

const NewAdvertForm = ({ onSubmit }) => {
  const dispatch = useDispatch();

  const allTags = useSelector(getTags);
  React.useEffect(() => {
    dispatch(advertsTagsAction());
  }, [dispatch]);

  return (
    <Form
      initialValue={{
        name: "",
        price: "",
        sale: null,
        tags: [],
      }}
      onSubmit={onSubmit}
    >
      <FormField type="text" name="name" autofocus />
      <FormField type="number" name="price" />
      <Radio name="sale" arrayValues={[BUY, SELL]} />
      <Select name="tags" allTags={allTags} />
      <FormField type="file" name="photo" accept="image/*" />
      <FormButton type="submit" variant="primary" id="form-submit">
        Publish
      </FormButton>
    </Form>
  );
};

export default NewAdvertForm;
