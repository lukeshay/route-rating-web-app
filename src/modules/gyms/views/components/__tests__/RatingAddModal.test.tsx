import React from 'react';
import RatingAddModal from '../RatingAddModal';
import { shallow } from '../../../../../__mocks__/setupEnzyme';
import * as TypeMocks from '../../../../../__mocks__/typeMocks';
import { shallowToJson } from 'enzyme-to-json';
import { ShallowWrapper } from 'enzyme';

describe('RatingAddModal', (): void => {
  let view: ShallowWrapper;

  beforeEach(() => {
    view = shallow(
      <RatingAddModal
        gym={TypeMocks.testGymOne}
        open={true}
        routeId={TypeMocks.testRouteOne.id}
        wallId={TypeMocks.testWallOne.id}
        handleClose={jest.fn()}
      />
    );
  });

  it('should render correctly', (): void => {
    expect(shallowToJson(view)).toMatchSnapshot();
  });

  it('should have correct fields', (): void => {
    expect(view.find("select[id='rating']")).toBeDefined();
    expect(view.find("select[id='grade']")).toBeDefined();
    expect(view.find("textarea[id='review']")).toBeDefined();
    expect(
      view.find("button[data-test-id='submit-button-test-id']")
    ).toBeDefined();
  });
});
