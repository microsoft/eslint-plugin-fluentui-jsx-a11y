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
    const propValue = getPropValue(getProp(attributes, name));
    /**
     * getPropValue normalized "true" and "false" to true and false boolean.
     * It is sufficent to check is the prop exists in such case.
     */
    if (typeof propValue === "boolean") {
        return hasProp(attributes, name);
    } else {
        return hasProp(attributes, name) && propValue.trim().length > 0;
    }
}

module.exports.hasNonEmptyProp = hasNonEmptyProp;
