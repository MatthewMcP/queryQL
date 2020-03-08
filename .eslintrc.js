module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
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
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true }
    ],
    "block-scoped-var": "error",
    "default-case": "error",
    "default-param-last": ["error"],
    "import/prefer-default-export": "off",
    "jsx-quotes": ["error", "prefer-double"],
    "max-len": ["error", { code: 100 }],
    "max-statements": ["error", 15, { ignoreTopLevelFunctions: true }],
    "no-else-return": "error",
    "no-extra-parens": "error",
    "no-magic-numbers": ["error", { ignoreArrayIndexes: true }],
    "no-nested-ternary": "error",
    "no-template-curly-in-string": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["error", { object: true, array: true }],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "sort-keys": ["error", "asc", { minKeys: 3, natural: true }],
    "vars-on-top": "error",
    camelcase: "error",
    complexity: ["error", 8],
    curly: ["error", "multi-or-nest"],
    eqeqeq: "error",
    quotes: ["error", "double"]
  }
};
