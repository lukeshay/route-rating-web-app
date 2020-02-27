import React from 'react';
import SignUpForm from '../SignUpForm';
import * as TypeMocks from '../../../../__mocks__/typeMocks';
import { shallow } from '../../../../../configs/setupEnzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViewStoreMock from '../../../../__mocks__/viewStoreMock';

describe('SignUpForm', () => {
  it('should render correctly.', async () => {
    const wrapper = shallow(
      <ViewStoreMock state={TypeMocks.darkDesktopState} dispatch={jest.fn()}>
        <SignUpForm handleSignInClick={jest.fn()} />
      </ViewStoreMock>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
