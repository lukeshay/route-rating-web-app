import React from 'react';
import ProfilePage from '../ProfilePage';
import * as TestUtils from '../../../__mocks__/testUtils';

const validateFullUserForm = (wrapper: TestUtils.RenderResult) => {
  expect(wrapper.queryAllByTestId('firstName-input-test-id')).toBeDefined();
  expect(wrapper.queryAllByTestId('lastName-input-test-id')).toBeDefined();
  expect(wrapper.queryAllByTestId('username-input-test-id')).toBeDefined();
  expect(wrapper.queryAllByTestId('email-input-test-id')).toBeDefined();
  expect(wrapper.queryAllByTestId('phoneNumber-input-test-id')).toBeDefined();
  expect(wrapper.queryAllByTestId('city-input-test-id')).toBeDefined();
  expect(wrapper.queryAllByTestId('state-input-test-id')).toBeDefined();
  expect(wrapper.queryAllByTestId('password-input-test-id')).toBeDefined();
  expect(
    wrapper.queryAllByTestId('repeatPassword-input-test-id')
  ).toBeDefined();

  const firstNameInput = wrapper
    .getByTestId('firstName-input-test-id')
    .getElementsByTagName('input')[0];
  const emailInput = wrapper
    .getByTestId('email-input-test-id')
    .getElementsByTagName('input')[0];
  const phoneNumberInput = wrapper
    .getByTestId('phoneNumber-input-test-id')
    .getElementsByTagName('input')[0];

  TestUtils.fireEvent.change(firstNameInput, { target: { value: 'a' } });
  TestUtils.fireEvent.change(emailInput, { target: { value: 'a' } });
  TestUtils.fireEvent.change(phoneNumberInput, { target: { value: 'a' } });

  expect(firstNameInput.value).toEqual('a');
  expect(emailInput.value).toEqual('a');
  expect(phoneNumberInput.value).toEqual('a');

  expect(wrapper.queryByText('Invalid email.')).toBeDefined();
  expect(
    wrapper.queryByText('Invalid phone number. Format: ##########')
  ).toBeDefined();
};
describe('<ProfilePage />', () => {
  describe('when someone is logged in', () => {
    let wrapper: TestUtils.RenderResult;

    beforeEach(() => {
      jest.resetModules();
      process.env.recaptchaKey = ' ';
      wrapper = TestUtils.renderSignedInDesktop(<ProfilePage />, {});
    });

    afterEach(() => {
      TestUtils.cleanup();
    });

    it('should render profile form and update fields.', () => {
      expect(wrapper.queryByTestId('profile-form-test-id')).toBeDefined();
      expect(wrapper.queryByText('Your profile')).toBeDefined();
      expect(wrapper.queryByText('Sign out')).toBeDefined();
      validateFullUserForm(wrapper);
    });

    it('should render sign up form when signing out.', function() {
      expect(wrapper.queryByTestId('profile-form-test-id')).toBeDefined();
      expect(wrapper.queryByText('Your profile')).toBeDefined();

      const signOutButton = wrapper.getByText('Sign out');

      TestUtils.fireEvent.click(signOutButton);

      expect(wrapper.queryByTestId('signUp-form-test-id')).toBeDefined();
      expect(wrapper.queryByText('Sign up')).toBeDefined();
      expect(wrapper.queryByText('Sign in')).toBeDefined();
      validateFullUserForm(wrapper);
    });
  });

  describe('when no one is logged in', () => {
    let wrapper: TestUtils.RenderResult;

    beforeEach(() => {
      jest.resetModules();
      process.env.recaptchaKey = ' ';
      wrapper = TestUtils.renderSignedOutDesktop(<ProfilePage />, {});
    });

    afterEach(() => {
      TestUtils.cleanup();
    });

    it('should render sign up form.', function() {
      expect(wrapper.queryByTestId('signUp-form-test-id')).toBeDefined();
      expect(wrapper.queryByText('Sign up')).toBeDefined();
      expect(wrapper.queryByText('Sign in')).toBeDefined();
      validateFullUserForm(wrapper);
    });

    it('should render sign in form.', function() {
      expect(wrapper.queryByTestId('signUp-form-test-id')).toBeDefined();
      expect(wrapper.queryByText('Sign up')).toBeDefined();

      const signInButton = wrapper.getByText('Sign in');

      TestUtils.fireEvent.click(signInButton);

      expect(wrapper.queryByTestId('signIn-form-test-id')).toBeDefined();
      expect(wrapper.queryAllByText('Sign in')).toHaveLength(2);
      expect(wrapper.queryByText('Sign up')).toBeDefined();
      expect(wrapper.queryByTestId('username-input-test-id')).toBeDefined();
      expect(wrapper.queryByTestId('password-input-test-id')).toBeDefined();
      expect(wrapper.queryByTestId('remeberMe-checkbox-test-id')).toBeDefined();
      expect(wrapper.queryByTestId('phoneNumber-input-test-id')).toBeNull();

      const usernameInput = wrapper
        .getByTestId('username-input-test-id')
        .getElementsByTagName('input')[0];
      const passwordInput = wrapper
        .getByTestId('password-input-test-id')
        .getElementsByTagName('input')[0];

      TestUtils.fireEvent.change(usernameInput, { target: { value: 'a' } });
      TestUtils.fireEvent.change(passwordInput, { target: { value: 'a' } });

      expect(usernameInput.value).toEqual('a');
      expect(passwordInput.value).toEqual('a');
    });
  });
});
