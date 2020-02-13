import React from "react";
import ProfilePage from "../ProfilePage";
import * as TestUtils from "../../../__mocks__/testUtils";

const validateFullUserForm = (wrapper: TestUtils.RenderResult) => {
  expect(wrapper.queryAllByTestId("firstName-input-test-id")).toBeDefined();
  expect(wrapper.queryAllByTestId("lastName-input-test-id")).toBeDefined();
  expect(wrapper.queryAllByTestId("username-input-test-id")).toBeDefined();
  expect(wrapper.queryAllByTestId("email-input-test-id")).toBeDefined();
  expect(wrapper.queryAllByTestId("phoneNumber-input-test-id")).toBeDefined();
  expect(wrapper.queryAllByTestId("city-input-test-id")).toBeDefined();
  expect(wrapper.queryAllByTestId("state-input-test-id")).toBeDefined();
  expect(wrapper.queryAllByTestId("password-input-test-id")).toBeDefined();
  expect(
    wrapper.queryAllByTestId("repeatPassword-input-test-id")
  ).toBeDefined();
};

describe("<ProfilePage />", () => {
  describe("when someone is logged in", () => {
    let wrapper: TestUtils.RenderResult;

    beforeEach(() => {
      wrapper = TestUtils.renderSignedInDesktop(<ProfilePage />, {});
    });

    afterEach(() => {
      TestUtils.cleanup();
    });

    it("should render profile form.", () => {
      expect(wrapper.queryByTestId("profile-form-test-id")).toBeDefined();
      expect(wrapper.queryByText("Your profile")).toBeDefined();
      expect(wrapper.queryByText("Sign out")).toBeDefined();
      validateFullUserForm(wrapper);
    });

    it("should render sign up form when signing out.", function() {
      expect(wrapper.queryByTestId("profile-form-test-id")).toBeDefined();
      expect(wrapper.queryByText("Your profile")).toBeDefined();

      const signOutButton = wrapper.getByText("Sign out");

      TestUtils.fireEvent.click(signOutButton);

      expect(wrapper.queryByTestId("signUp-form-test-id")).toBeDefined();
      expect(wrapper.queryByText("Sign up")).toBeDefined();
      expect(wrapper.queryByText("Sign in")).toBeDefined();
      validateFullUserForm(wrapper);
    });
  });

  describe("when no one is logged in", () => {
    let wrapper: TestUtils.RenderResult;

    beforeEach(() => {
      wrapper = TestUtils.renderSignedOutDesktop(<ProfilePage />, {});
    });

    afterEach(() => {
      TestUtils.cleanup();
    });

    it("should render sign up form.", function() {
      expect(wrapper.queryByTestId("signUp-form-test-id")).toBeDefined();
      expect(wrapper.queryByText("Sign up")).toBeDefined();
      expect(wrapper.queryByText("Sign in")).toBeDefined();
      validateFullUserForm(wrapper);
    });

    it("should render sign in form.", function() {
      expect(wrapper.queryByTestId("signUp-form-test-id")).toBeDefined();
      expect(wrapper.queryByText("Sign up")).toBeDefined();

      const signInButton = wrapper.getByText("Sign in");

      TestUtils.fireEvent.click(signInButton);

      expect(wrapper.queryByTestId("signIn-form-test-id")).toBeDefined();
      expect(wrapper.queryAllByText("Sign in")).toHaveLength(2);
      expect(wrapper.queryByText("Sign up")).toBeDefined();
      expect(wrapper.queryByTestId("username-input-test-id")).toBeDefined();
      expect(wrapper.queryByTestId("password-input-test-id")).toBeDefined();
      expect(wrapper.queryByTestId("phoneNumber-input-test-id")).toBeNull();
    });
  });
});
