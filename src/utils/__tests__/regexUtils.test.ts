import * as RegexUtils from "../regexUtils";

describe("regexUtils", () => {
  it("validate email.", () => {
    const validEmail = "luke@test.com";
    const invalidEmails = ["Luke@test", "test.com", "com@.luke"];

    expect(RegexUtils.validEmail(validEmail)).toBe(true);
    expect(RegexUtils.validEmail(invalidEmails[0])).toBe(false);
    expect(RegexUtils.validEmail(invalidEmails[1])).toBe(false);
    expect(RegexUtils.validEmail(invalidEmails[2])).toBe(false);
  });

  it("check for lowercase, uppercase, numbers, and special characters.", () => {
    const uppercase = "KJH987&*(";
    const lowercase = "124s[]";
    const noNumbers = "kakh&(*&[";
    const noSpecial = "asdfJHK123asafFD6d7";
    const onlyNumbers = "12349871234";

    expect(RegexUtils.containsLowercase(lowercase)).toBe(true);
    expect(RegexUtils.containsLowercase(uppercase)).toBe(false);

    expect(RegexUtils.containsUppercase(uppercase)).toBe(true);
    expect(RegexUtils.containsUppercase(lowercase)).toBe(false);

    expect(RegexUtils.containsNumber(lowercase)).toBe(true);
    expect(RegexUtils.containsNumber(noNumbers)).toBe(false);

    expect(RegexUtils.containsSpecialCharacter(lowercase)).toBe(true);
    expect(RegexUtils.containsSpecialCharacter(noSpecial)).toBe(false);

    expect(RegexUtils.containsOnlyNumbers(onlyNumbers)).toBe(true);
    expect(RegexUtils.containsOnlyNumbers(noSpecial)).toBe(false);
  })
});
