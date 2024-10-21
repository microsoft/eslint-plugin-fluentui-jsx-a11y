// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:eslint-plugin/recommended",
        "plugin:node/recommended",
        "prettier",
        "plugin:eslint-plugin/recommended"
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
        }
    ],
    rules: {
        "header/header": [2, "line", [" Copyright (c) Microsoft Corporation.", " Licensed under the MIT License."], 2],
        "no-console": "warn" // Add this to warn about console statements
    },
    ignorePatterns: ["node_modules", "dist/", "scripts"]
};
