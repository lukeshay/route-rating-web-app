import React from 'react';
import GymsPage from '../GymsPage';
import GymsStoreMock from '../../../../__mocks__/gymsStoreMock';
import { GymsContextState } from '../../../../context/gyms/gymsStore';
import * as TypeMocks from '../../../../__mocks__/typeMocks';
import { shallow } from '../../../../__mocks__/setupEnzyme';
import { shallowToJson } from 'enzyme-to-json';
import { GymPageType } from '../../../../types';

const mockGymsState: GymsContextState = {
  page: {
    content: [TypeMocks.testGymOne, TypeMocks.testGymTwo],
  } as GymPageType,
};

describe('<GymsPage />', (): void => {
  it('should render correctly', (): void => {
    const gymsPage = shallow(
      <GymsStoreMock state={mockGymsState} dispatch={jest.fn()}>
        <GymsPage />
      </GymsStoreMock>
    );
    expect(shallowToJson(gymsPage)).toMatchSnapshot();
  });
});
