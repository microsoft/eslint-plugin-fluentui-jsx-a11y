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
    if (!hasProp(attributes, name)) {
        return false;
    }
    const propValue = getPropValue(getProp(attributes, name));
    /**
     * getPropValue internally normalizes "true", "false" to boolean values.
     * So it is sufficent to check if the prop exists and return.
     */
    if (typeof propValue === "boolean") {
        return true;
    }
    return propValue.trim().length > 0;
}
module.exports.hasNonEmptyProp = hasNonEmptyProp;
