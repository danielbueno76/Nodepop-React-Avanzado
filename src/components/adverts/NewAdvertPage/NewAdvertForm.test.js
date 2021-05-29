import React from "react";
import { shallow } from "enzyme";
import NewAdvertForm from "./NewAdvertForm";
import { SELL } from "../../../utils/utils";

jest.mock("react-redux");

describe("NewAdvertForm", () => {
  const props = {
    onSubmit: jest.fn(),
  };

  const render = () => shallow(<NewAdvertForm {...props} />);

  test("should render", () => {
    const wrapper = render();
    expect(wrapper.exists()).toBe(true);
  });

  test("snapshot testing", () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  test("should submit advert", () => {
    const data = {
      name: "Car",
      price: "1000",
      sale: SELL,
      tags: ["lifestyle"],
    };
    const wrapper = render();

    const nameField = wrapper.find("FormField").at(0);
    nameField.props().onChange({
      target: { name: "name", value: data.name },
    });
    const priceField = wrapper.find("FormField").at(1);
    priceField.props().onChange({
      target: { name: "price", value: data.price },
    });
    const saleField = wrapper.find("Radio").at(0);
    saleField.props().onChange({
      target: { name: "sale", value: data.sale },
    });
    const tagsField = wrapper.find("Select").at(0);
    tagsField.props().onChange({
      target: { name: "tags", value: data.tags },
    });
    const form = wrapper.find("form");
    form.simulate("submit", { preventDefault: jest.fn });

    expect(wrapper.find("#form-submit").props().disabled).toBe(false);
    expect(props.onSubmit).toHaveBeenCalledWith(data);
  });
});
