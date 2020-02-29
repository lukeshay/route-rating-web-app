import React from 'react';
import * as TypeMocks from '../../../../__mocks__/typeMocks';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../../../../../configs/setupEnzyme';
import GymPage from '../GymPage';
import TestComponentWrapper from '../../../../__mocks__/TestComponentWrapper';
import * as TestUtils from '../../../../__mocks__/testUtils';
import * as WallUtils from '../../../../utils/wallUtils';

describe('GymPage', () => {
  it('should render correctly when editor.', () => {
    expect(
      shallowToJson(
        shallow(
          <TestComponentWrapper
            gymsState={TypeMocks.mockGymsState}
            location={`/gyms/${TypeMocks.testGymOne.id}`}
            userState={TypeMocks.signedInEditorState}
            viewState={TypeMocks.darkDesktopState}
          >
            <GymPage />
          </TestComponentWrapper>
        )
      )
    ).toMatchSnapshot();
  });
});

describe('GymPage', () => {
  let view: TestUtils.RenderResult;

  beforeEach(function() {
    jest.resetModules();
    process.env.recaptchaKey = ' ';

    view = TestUtils.render(
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

  it('should render gym card.', async function() {
    expect(view.queryByText(TypeMocks.testGymOne.address)).toBeDefined();
    expect(view.queryByText(TypeMocks.testGymOne.city)).toBeDefined();
    expect(view.queryByText(TypeMocks.testGymOne.state)).toBeDefined();
    expect(view.queryByText(TypeMocks.testGymOne.name)).toBeDefined();
    expect(view.queryByText(TypeMocks.testGymOne.website)).toBeDefined();
    expect(view.queryByText(TypeMocks.testGymOne.email)).toBeDefined();
    expect(view.queryByText(TypeMocks.testGymOne.zipCode)).toBeDefined();
    expect(view.queryByText(TypeMocks.testGymOne.phoneNumber)).toBeDefined();
  });

  it('should render wall list.', async function() {
    if (TypeMocks.testGymOne.walls) {
      expect(
        view.queryByText(TypeMocks.testGymOne.walls[1].name)
      ).toBeDefined();
      expect(
        view.queryByText(TypeMocks.testGymOne.walls[0].name)
      ).toBeDefined();
      expect(
        view.queryAllByText(
          WallUtils.typesAsString(TypeMocks.testGymOne.walls[0].types)
        )
      ).toHaveLength(2);
    } else {
      fail();
    }
  });

  it('should render route list when clicking on a wall', async function() {
    if (TypeMocks.testGymOne.walls) {
      const wall = TypeMocks.testGymOne.walls[0];
      const routes = wall.routes;

      TestUtils.fireEvent.click(view.getByText(wall.name));

      routes.forEach((route): void => {
        expect(view.queryByText(route.holdColor)).toBeDefined();
        expect(view.queryByText(route.setter)).toBeDefined();
        expect(view.queryByText(route.name)).toBeDefined();
        expect(view.queryByText(route.averageGrade)).toBeDefined();
        expect(view.queryByText(route.averageRating.toString())).toBeDefined();
      });

      expect(
        view.queryAllByText(WallUtils.typesAsString(routes[0].types))
      ).toHaveLength(2);
    } else {
      fail();
    }
  });
});
