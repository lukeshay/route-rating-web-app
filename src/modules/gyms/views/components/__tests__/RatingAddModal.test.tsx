import React from "react";
import RatingAddModal from "../RatingAddModal";
import { shallow } from "../../../../../../configs/setupEnzyme";
import * as TypeMocks from "../../../../../__mocks__/typeMocks";
import { shallowToJson } from "enzyme-to-json";

let view;

describe("<RatingAddModal />", () => {
  beforeEach(() => {
    view = shallow(
      <RatingAddModal
        gym={TypeMocks.testGymOne}
        open={true}
        routeId={TypeMocks.testRouteOne.id}
        wallId={TypeMocks.testWallOne.id}
        handleClose={() => {}}
      />
    );
  });

  it("should render correctly", () => {
    expect(shallowToJson(view)).toMatchSnapshot();
  });

  it("should have correct fields", () => {
    expect(view.find("select[id='rating']")).toBeDefined();
    expect(view.find("select[id='grade']")).toBeDefined();
    expect(view.find("textarea[id='review']")).toBeDefined();
    expect(view.find("button[data-test-id='submit-button-test-id']")).toBeDefined();
  });
});
