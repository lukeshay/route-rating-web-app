import React from "react";
import GymCard from "../GymCard";
import { shallow } from "../../../../../../configs/setupEnzyme";
import { shallowToJson } from "enzyme-to-json";
import * as TypeMocks from "../../../../../__mocks__/typeMocks";

describe("GymCard", () => {
  it("display correctly for desktop.", () => {
    const gymsPage = shallow(
      <GymCard gym={TypeMocks.testGymOne} mobile={false} />
    );
    expect(shallowToJson(gymsPage)).toMatchSnapshot();
  });

  it("display correctly for mobile.", () => {
    const gymsPage = shallow(
      <GymCard gym={TypeMocks.testGymOne} mobile={true} />
    );
    expect(shallowToJson(gymsPage)).toMatchSnapshot();
  });
});
