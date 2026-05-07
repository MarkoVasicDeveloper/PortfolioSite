import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",

      complexity: ["warn", 10],
      "max-depth": ["warn", 3],
      "max-lines-per-function": ["warn", 50],

      eqeqeq: ["error", "always"],
      curly: "error",
      "no-multiple-empty-lines": ["warn", { max: 1 }],
    },
  },
];
