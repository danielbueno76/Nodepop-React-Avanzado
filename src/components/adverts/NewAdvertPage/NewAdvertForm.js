import React from "react";
import { FormField, Radio, Form, FormButton } from "../../shared";
import { BUY, SELL } from "../../../utils/utils";
import SelectTags from "../SelectTags";

const NewAdvertForm = ({ onSubmit }) => {
  return (
    <Form
      initialValue={{
        name: "",
        price: "",
        description: "",
        sale: null,
        tags: [],
      }}
      onSubmit={onSubmit}
    >
      <FormField type="text" name="name" autofocus />
      <FormField type="textarea" name="description" />
      <FormField type="number" name="price" />
      <Radio name="sale" arrayValues={[BUY, SELL]} />
      <SelectTags />
      <FormField type="file" name="photo" accept="image/*" />
      <FormButton type="submit" variant="primary" id="form-submit">
        Publish
      </FormButton>
    </Form>
  );
};

export default NewAdvertForm;
