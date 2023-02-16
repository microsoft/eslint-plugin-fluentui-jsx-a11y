//Copyright (c) Microsoft Corporation.
//Licensed under the MIT License.

"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  "plugins": [
    "header"
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
  "rules": {
    "header/header": [2, "line", ["Copyright (c) Microsoft Corporation.", "Licensed under the MIT License."], 2],
  }
};
