import next from "eslint-config-next";

const eslintConfig = [
	...next,
	{
		ignores: ["sanityBackend/types.ts"],
		rules: {
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-namespace": "off",
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
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
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
	},
];

export default eslintConfig;
