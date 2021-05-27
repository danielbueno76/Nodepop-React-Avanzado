import React from "react";
import useForm from "../../../hooks/useForm";
import { Button, FormField, Radio, Select } from "../../shared";
import { BUY, SELL, MAX, MIN } from "../../../utils/utils";
import { getAdvertsTags } from "../../../api/adverts";

const NewAdvertForm = ({ onSubmit }) => {
  const [advert, handleChange, handleSubmit] = useForm({
    name: "",
    price: "",
    sale: null,
    tags: [],
  });
  const [allTags, setAllTags] = React.useState([]);

  React.useEffect(() => {
    getAdvertsTags().then(setAllTags);
  }, []);

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
        disabled={!name || !price || !sale || !tags}
      >
        Publish
      </Button>
    </form>
  );
};

export default NewAdvertForm;
