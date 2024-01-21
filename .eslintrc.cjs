module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    env: { node: true },
    overrides: [
        {
            files: ["./client/**/*"],
            env: { browser: true },
            settings: {
                react: {
                    version: "detect",
                },
            },
            extends: [
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
            ],
            rules: {
                "react/react-in-jsx-scope": "off",
            },
        },
    ],
}
