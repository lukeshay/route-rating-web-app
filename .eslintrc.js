require('@lukeshay/eslint-config-typescript/patch')

module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "@lukeshay/eslint-config-typescript"
  ],
  plugins: ["react", '@typescript-eslint'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  rules: {
    "react/prop-types": 0
  },
  parser: "@typescript-eslint/parser"
}
