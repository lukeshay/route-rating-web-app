import * as GymUtils from "../gymUtils";
import * as TypeMocks from "../../__mocks__/typeMocks";
import { Gym } from "../../types";
import { testGymTwo } from "../../__mocks__/typeMocks";
import exp from "constants";

describe("GymUtils", () => {
  it("should get whether user is authorized.", () => {
    expect(
      GymUtils.isAuthorizedEditor(
        TypeMocks.testGymOne,
        TypeMocks.testUserEditor
      )
    ).toBeTruthy();
    TypeMocks.testUserEditor.id = "1";
    expect(
      GymUtils.isAuthorizedEditor(
        TypeMocks.testGymOne,
        TypeMocks.testUserEditor
      )
    ).toBeFalsy();
  });

  it("should get the wall by id", () => {
    expect(
      GymUtils.getWallById(TypeMocks.testGymOne, TypeMocks.testWallOne.id)
    ).toBe(TypeMocks.testWallOne);
    expect(
      GymUtils.getWallById(TypeMocks.testGymOne, TypeMocks.testWallTwo.id)
    ).toBe(TypeMocks.testWallTwo);
    expect(GymUtils.getWallById(TypeMocks.testGymOne, "id")).toBeUndefined();
  });

  it("should get the route by id", () => {
    expect(
      GymUtils.getRouteById(TypeMocks.testWallOne, TypeMocks.testRouteOne.id)
    ).toBe(TypeMocks.testRouteOne);
    expect(
      GymUtils.getRouteById(TypeMocks.testWallOne, TypeMocks.testRouteTwo.id)
    ).toBe(TypeMocks.testRouteTwo);
    expect(GymUtils.getRouteById(TypeMocks.testWallOne, "id")).toBeUndefined();
  });

  it("should parse the types to a string", () => {
    expect(GymUtils.parseTypesToString(TypeMocks.testWallOne.types)).toEqual(
      "Lead, Top rope"
    );
    expect(GymUtils.parseTypesToString(TypeMocks.testRouteOne.types)).toEqual(
      "Top rope, Lead"
    );
  });

  it("should get gym by id.", function() {
    const gymArray: Gym[] = [TypeMocks.testGymOne, TypeMocks.testGymTwo];

    expect(GymUtils.getGymById(gymArray, TypeMocks.testGymOne.id)).toBe(
      TypeMocks.testGymOne
    );

    expect(GymUtils.getGymById(gymArray, "asdf")).toBeUndefined();
  });
});
