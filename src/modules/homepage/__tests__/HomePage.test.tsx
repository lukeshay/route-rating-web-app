import React from "react";
import HomePage from "../HomePage";
import { shallow } from "../../../../configs/setupEnzyme";
import { shallowToJson } from "enzyme-to-json";

describe("<HomePage />", () => {
  it("should render correctly.", () => {
    expect(shallowToJson(shallow(<HomePage />))).toMatchSnapshot();
  });
});
