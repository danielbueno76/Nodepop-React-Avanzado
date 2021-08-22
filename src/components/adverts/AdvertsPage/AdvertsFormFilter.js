import React from "react";
import {
  FormField,
  Radio,
  Slider,
  Form,
  FormButton,
  ClearButton,
} from "../../shared";
import { BUY, SELL, stepByDecimals } from "../../../utils/utils";
import SelectTags from "../SelectTags";

// eslint-disable-next-line
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) {
    return 0;
  }
  return this.toString().split(".")[1].length || 0;
};

const AdvertsFormFilter = ({ onSubmit, prices }) => {
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;
  return (
    <div className="box">
      <Form
        initialValue={{
          name: "",
          price: [min, max],
          sale: null,
          tags: [],
        }}
        onSubmit={onSubmit}
      >
        <FormField type="text" name="name" autofocus />
        <Slider
          name="price"
          min={min}
          max={max}
          marks={{ [min]: min, [max]: max }}
          step={stepByDecimals(max > min ? max : min)}
        />
        <Radio name="sale" arrayValues={[BUY, SELL]} />
        <SelectTags />
        <FormButton type="submit" variant="primary" notDisabled>
          Apply filter
        </FormButton>
        <ClearButton type="submit">Clear filter</ClearButton>
      </Form>
    </div>
  );
};

export default AdvertsFormFilter;
