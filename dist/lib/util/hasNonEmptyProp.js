"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var hasProp = require("jsx-ast-utils").hasProp;
var getPropValue = require("jsx-ast-utils").getPropValue;
var getProp = require("jsx-ast-utils").getProp;
/**
 * Determines if the prop exists and has a non-empty value.
 * @param {*} attributes
 * @param {*} name
 * @returns boolean
 */
function hasNonEmptyProp(attributes, name) {
    return hasProp(attributes, name) && getPropValue(getProp(attributes, name)).trim().length > 0;
}
module.exports.hasNonEmptyProp = hasNonEmptyProp;
