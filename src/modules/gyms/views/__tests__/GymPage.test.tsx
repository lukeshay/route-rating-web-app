import React from "react";
import * as TypeMocks from "../../../../__mocks__/typeMocks";
import { shallowToJson } from "enzyme-to-json";
import { shallow } from "../../../../../configs/setupEnzyme";
import GymPage from "../GymPage";
import TestComponentWrapper from "../../../../__mocks__/TestComponentWrapper";

let wrapper;

describe("<GymPage />", () => {
  beforeEach(() => {
    wrapper = shallow(
      <TestComponentWrapper
        gymsState={TypeMocks.mockGymsState}
        location={`/gyms/${TypeMocks.testGymOne.id}`}
        userState={TypeMocks.signedInEditorState}
        viewState={TypeMocks.darkDesktopState}
      >
        <GymPage />
      </TestComponentWrapper>
    );
  });

  it("should render correctly when editor.", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
