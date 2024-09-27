"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { applicableComponents: ButtonBasedComponents } = require("./buttonBasedComponents");
const { applicableComponents: InputBasedComponents } = require("./inputBasedComponents");
const applicableComponents = ["SpinButton", ...ButtonBasedComponents, ...InputBasedComponents];
module.exports = {
    applicableComponents
};
