// @ts-check

import js from "@eslint/js";
import globals from "globals";

/** @type {Array<import("eslint").Linter.FlatConfig>} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
