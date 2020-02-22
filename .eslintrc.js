module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "eslint:recommended",
    "stylelint-prettier/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "tslint-plugin-prettier",
    "tslint-config-prettier"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier", "react", "@typescript-eslint"],
  rules: {
    rules: {
      "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
      prettier: true,
      "@typescript-eslint/explicit-function-return-type": true
    }
  }
};
