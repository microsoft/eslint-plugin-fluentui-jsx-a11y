// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:eslint-plugin/recommended",
        "plugin:node/recommended",
        "plugin:prettier/recommended" // Prettier plugin must be last in the extensions
    ],
    plugins: ["header"],
    env: {
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2021, // Allows the latest ECMAScript features
        sourceType: "module" // Ensures `import` and `export` syntax are valid
    },
    overrides: [
        {
            files: ["tests/**/*.js"],
            env: { mocha: true }
        },
        {
            files: ["tests/**/*.ts"],
            env: { jest: true }
        },
        {
            files: ["**/*.ts"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module",
                project: "./tsconfig.json"
            },
            rules: {
                // Disable Node.js rules that conflict with TypeScript
                "node/no-missing-import": "off",
                "node/no-unsupported-features/es-syntax": "off",
                "node/no-extraneous-import": "off"
            }
        },
        {
            files: ["lib/index.ts"],
            rules: {
                "sort-keys": ["error", "asc", { caseSensitive: true, natural: false }]
            }
        }
    ],
    rules: {
        "header/header": [2, "line", [" Copyright (c) Microsoft Corporation.", " Licensed under the MIT License."], 2],
        "no-console": "warn" // Add this to warn about console statements
    },
    ignorePatterns: ["node_modules", "dist/", "scripts"]
};
