// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var hasProp = require("jsx-ast-utils").hasProp;
var getPropValue = require("jsx-ast-utils").getPropValue;
var getProp = require("jsx-ast-utils").getProp;

function hasNonEmptyProp(attributes, name) {
    return hasProp(attributes, name) && getPropValue(getProp(attributes, name)).trim().length > 0;
}

module.exports.hasNonEmptyProp = hasNonEmptyProp;
