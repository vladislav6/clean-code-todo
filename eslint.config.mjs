import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from 'globals';
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: [
      js.configs.recommended,
      eslintConfigPrettier
    ],
		rules: {
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "error"
    },
    languageOptions: {
      globals: globals.browser
    }
	},
]);
