import React from "react";
import useForm from "../../../hooks/useForm";
import { Button, FormField, Radio, Select } from "../../shared";
import { BUY, SELL, MAX, MIN } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { advertsTagsAction } from "../../../store/actions";
import { getTags } from "../../../store/selectors";

const NewAdvertForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [advert, handleChange, handleSubmit] = useForm({
    name: "",
    price: "",
    sale: null,
    tags: [],
  });
  const allTags = useSelector(getTags);
  React.useEffect(() => {
    dispatch(advertsTagsAction());
  }, [dispatch]);

  const handleFormSubmit = () => {
    onSubmit(advert);
  };

  const { name, price, sale, tags } = advert;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormField
        type="text"
        name="name"
        label="Name"
        value={name}
        placeholder="Name"
        onChange={handleChange}
        autofocus
      />
      <FormField
        type="number"
        max={MAX}
        min={MIN}
        name="price"
        label="Price"
        value={price}
        onChange={handleChange}
      />
      <Radio
        name="sale"
        value={sale}
        arrayValues={[BUY, SELL]}
        onChange={handleChange}
      />
      <Select
        name="tags"
        value={tags}
        allTags={allTags}
        onChange={handleChange}
      />
      <FormField
        type="file"
        name="photo"
        label="Photo"
        accept="image/*"
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="primary"
        id="form-submit"
        disabled={!name || !price || !sale || !tags}
      >
        Publish
      </Button>
    </form>
  );
};

export default NewAdvertForm;
