import * as TypeMocks from '../../../../__mocks__/typeMocks';
import ProfileForm from '../ProfileForm';
import React from 'react';
import { shallow } from '../../../../../configs/setupEnzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('ProfileForm', () => {
  it('should render correctly.', async () => {
    const wrapper = shallow(<ProfileForm user={TypeMocks.testUserEditor} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
