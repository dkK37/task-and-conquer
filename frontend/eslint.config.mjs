import globals from "globals";
import pluginJs from "@eslint/js";
import angularEslint from "@angular-eslint/eslint-plugin";
import jsEslint from "eslint-plugin-jsdoc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.ts", "src/**/*.html"], // Match the .ts and .html files
    rules: {
      // You can add specific linting rules for these file types here if needed
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      angular: angularEslint,
      jsdoc: jsEslint,
    },
    rules: {
      "jsdoc/check-alignment": "warn",
    },
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
    },
  },
];
