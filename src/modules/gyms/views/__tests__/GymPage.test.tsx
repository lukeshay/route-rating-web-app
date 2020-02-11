import React from "react";
import * as TypeMocks from "../../../../__mocks__/typeMocks";
import { mountToJson } from "enzyme-to-json";
import { mount } from "../../../../../configs/setupEnzyme";
import GymPage from "../GymPage";
import Wrapper from "../../../../__mocks__/Wrapper";

describe("<GymPage />", () => {
  it("should render correctly when editor.", () => {
    const gymPage = mount(
      <Wrapper
        gymsState={TypeMocks.mockGymsState}
        location={`/gyms/${TypeMocks.testGymOne.id}`}
        userState={TypeMocks.mockUserState}
        viewState={TypeMocks.mockViewState}
      >
        <GymPage />
      </Wrapper>
    );

    expect(mountToJson(gymPage)).toMatchSnapshot();

    gymPage.find(`tr[id='${TypeMocks.testWallOne.id}']`).simulate("click");
    expect(mountToJson(gymPage)).toMatchSnapshot();

    gymPage.find(`tr[id='${TypeMocks.testRouteOne.id}']`).simulate("click");
    expect(mountToJson(gymPage)).toMatchSnapshot();
  });
});
