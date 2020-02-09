import React from "react";
import GymsPage from "../GymsPage";
import GymsStoreMock from "../../../../__mocks__/gymsStoreMock";
import { IGymsContextState } from "../../../../context/gyms/gymsStore";
import * as TypeMocks from "../../../../__mocks__/typeMocks";
import { shallow } from "../../../../../configs/setupEnzyme";
import { shallowToJson } from "enzyme-to-json";
import { GymPage } from "../../../../types";

const mockGymsState: IGymsContextState = {
  page: { content: [TypeMocks.testGymOne, TypeMocks.testGymTwo] } as GymPage
};

describe("<GymsPage />", () => {
  it("should render correctly", () => {
    const gymsPage = shallow(
      <GymsStoreMock state={mockGymsState} dispatch={() => {}}>
        <GymsPage />
      </GymsStoreMock>
    );
    expect(shallowToJson(gymsPage)).toMatchSnapshot();
  });
});
