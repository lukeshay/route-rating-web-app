import React from 'react';
import SignInForm from '../SignInForm';
import { shallow } from '../../../../__mocks__/setupEnzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('SignInForm', () => {
  it('should render correctly.', async () => {
    const wrapper = shallow(<SignInForm handleSignUpClick={jest.fn()} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
