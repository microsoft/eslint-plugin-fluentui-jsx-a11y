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
    plugins: ["header", "sort-imports-es6-autofix", "sort-keys-fix"],
    env: {
        node: true
    },
    overrides: [
        {
            files: ["tests/**/*.js"],
            env: { mocha: true }
        }
    ],
    rules: {
        "header/header": [2, "line", [" Copyright (c) Microsoft Corporation.", " Licensed under the MIT License."], 2],
        "sort-imports-es6-autofix/sort-imports-es6": [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false
            }
        ],
        "sort-keys-fix/sort-keys-fix": [
            "error",
            "asc",
            {
                caseSensitive: false,
                natural: true
            }
        ]
    },
    ignorePatterns: ["node_modules", "dist/"]
};
