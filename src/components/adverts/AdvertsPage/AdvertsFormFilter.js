import React from "react";
import { Button, FormField, Radio, Slider, Select } from "../../shared";
import { BUY, SELL, MIN, MAX } from "../../../utils/utils";
import { getAdvertsTags } from "../../../api/adverts";

const AdvertsFormFilter = ({ onSubmit }) => {
  const [advertFilter, setAdvertFilter] = React.useState({
    name: "",
    price: [MIN, MAX],
    tags: [],
  });
  const [allTags, setAllTags] = React.useState([]);

  React.useEffect(() => {
    getAdvertsTags().then(setAllTags);
  }, []);

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    onSubmit(advertFilter);
  };

  const handleChange = (ev) => {
    let valueEvent = ev.target.value;

    if (ev.target.selectedOptions) {
      // select component
      valueEvent = Array.from(
        ev.target.selectedOptions,
        (option) => option.value
      );
    }
    setAdvertFilter((oldValue) => ({
      ...oldValue,
      [ev.target.name]: valueEvent,
    }));
  };

  const handleSlider = (ev) => {
    setAdvertFilter((oldValue) => ({
      ...oldValue,
      price: ev,
    }));
  };

  const handleSliderMin = (ev) => {
    setAdvertFilter((oldValue) => ({
      ...oldValue,
      [ev.target.name]: [+ev.target.value, oldValue[ev.target.name][1]],
    }));
  };

  const handleSliderMax = (ev) => {
    setAdvertFilter((oldValue) => ({
      ...oldValue,
      [ev.target.name]: [oldValue[ev.target.name][0], +ev.target.value],
    }));
  };

  const handleClearFilter = () => {
    setAdvertFilter({
      name: "",
      price: [MIN, MAX],
      tags: [],
    });
  };

  const { name, price, sale, tags } = advertFilter;
  return (
    <div className="box">
      <form onSubmit={handleFormSubmit}>
        <FormField
          type="text"
          name="name"
          label="Name"
          value={name}
          placeholder="Name"
          onChange={handleChange}
          autofocus
        />
        <Slider
          label="Price"
          name="price"
          min={MIN}
          max={MAX}
          value={price}
          onChange={handleSlider}
          onChangeMin={handleSliderMin}
          onChangeMax={handleSliderMax}
        />
        <Radio
          name="sale"
          value={sale}
          arrayValues={[BUY, SELL]}
          onChange={handleChange}
        />
        <Select
          label="Tags"
          name="tags"
          value={tags}
          allTags={allTags}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary">
          Apply filter
        </Button>
        <Button type="submit" onClick={handleClearFilter}>
          Clear filter
        </Button>
      </form>
    </div>
  );
};

export default AdvertsFormFilter;
