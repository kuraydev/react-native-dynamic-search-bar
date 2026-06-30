const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const prettier = require("eslint-config-prettier");

const commonGlobals = {
  require: "readonly",
  module: "writable",
  __dirname: "readonly",
  process: "readonly",
  console: "readonly",
};

const testGlobals = {
  jest: "readonly",
  describe: "readonly",
  it: "readonly",
  test: "readonly",
  expect: "readonly",
  beforeEach: "readonly",
  afterEach: "readonly",
  beforeAll: "readonly",
  afterAll: "readonly",
};

module.exports = tseslint.config(
  {
    ignores: [
      "lib/**",
      "build/**",
      "node_modules/**",
      "example/**",
      "coverage/**",
      "*.config.js",
      ".prettierrc.js",
      "jest.setup.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": reactHooks },
    languageOptions: {
      globals: { ...commonGlobals, ...testGlobals },
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettier,
);
