import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	// ...compat.extends("next/core-web-vitals", "next/typescript"),
	...compat.config({
		extends: ["next/core-web-vitals", "next/typescript", "prettier"],
		rules: {
			"@typescript-eslint/no-empty-object-type": ["off"],
			"@typescript-eslint/no-namespace": ["off"],
			"comma-dangle": ["error", "always-multiline"],
			indent: ["error", "tab", { SwitchCase: 1 }],
			"key-spacing": [
				"error",
				{
					afterColon: true,
					beforeColon: false,
					mode: "strict",
				},
			],
			"object-shorthand": "error",
			"linebreak-style": ["error", "unix"],
			"no-unused-vars": [
				"error",
				{
					vars: "all",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			"prefer-arrow-callback": ["error"],
			"prefer-template": ["error"],
			quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
			semi: ["error"],
		},
	}),
];

export default eslintConfig;
