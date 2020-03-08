require('@lukeshay/eslint-config-typescript/patch')

module.exports = {
  extends: [
    "plugin:react/recommended",
    "@lukeshay/eslint-config-typescript"
  ],
  plugins: ["react"],
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
  }
}
