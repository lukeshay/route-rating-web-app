import React from "react";
import GymsPage from "../GymsPage";
import GymsStoreMock from "../../../../__mocks__/gymsStoreMock";
import { IGymsContextState } from "../../../../context/gyms/gymsStore";
import * as TypeMocks from "../../../../__mocks__/typeMocks";
import { mount, shallow } from "../../../../../configs/setupEnzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
import { GymPageType } from "../../../../types";
import GymCard from "../components/GymCard";
import Wrapper from "../../../../__mocks__/Wrapper";

const mockGymsState: IGymsContextState = {
  page: { content: [TypeMocks.testGymOne, TypeMocks.testGymTwo] } as GymPageType
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

  // it("events should perform correctly.", () => {
  //   const gymsPage = mount(
  //     <Wrapper
  //       gymsState={TypeMocks.mockGymsState}
  //       location={`/gyms/${TypeMocks.testGymOne.id}`}
  //       userState={TypeMocks.mockUserState}
  //       viewState={TypeMocks.mockViewState}
  //     >
  //       <GymsPage />
  //     </Wrapper>
  //   );
  //
  //   gymsPage
  //     .find("h4")
  //     .first()
  //     .simulate("click");
  //
  //   expect(gymsPage.instance().).toMatchSnapshot();
  // });
});
