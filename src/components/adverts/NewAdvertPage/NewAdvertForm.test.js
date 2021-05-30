import React from "react";
import { shallow } from "enzyme";
import NewAdvertForm from "./NewAdvertForm";

jest.mock("react-redux");

describe("NewAdvertForm", () => {
  const props = {
    onSubmit: jest.fn(),
  };

  const render = () => shallow(<NewAdvertForm {...props} />);
  const wrapper = render();

  test("should render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("snapshot testing", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("should find 3 FormField", () => {
    expect(wrapper.find("FormField")).toHaveLength(3);
  });

  test("should call event onSubmit", () => {
    const form = wrapper.find("Form");
    form.simulate("submit", { preventDefault: jest.fn });

    expect(props.onSubmit).toBeCalled();
  });
});
