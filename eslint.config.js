import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      semi: "error",          // requires semicolons
      "prefer-const": "error" // prefer const over let/var
    }
  }
];
