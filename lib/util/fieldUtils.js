// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var elementType = require("jsx-ast-utils").elementType;

function isInsideFieldTag(context) {
    const ancestors = context.getAncestors();

    if (ancestors == null || ancestors.length === 0) {
        return false;
    }

    var isInsideField = false;
    ancestors.forEach(node => {
        if (
            node.type === "JSXElement" &&
            node.openingElement != null &&
            node.openingElement.type === "JSXOpeningElement" &&
            elementType(node.openingElement) === "Field"
        ) {
            isInsideField = true;
        }
    });

    return isInsideField;
}

module.exports = {
    isInsideFieldTag
};
