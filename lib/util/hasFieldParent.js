// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var elementType = require("jsx-ast-utils").elementType;

function hasFieldParent(context) {
    const ancestors = context.getAncestors();

    if (ancestors == null || ancestors.length === 0) {
        return false;
    }

    var field = false;

    ancestors.forEach(item => {
        if (
            item.type === "JSXElement" &&
            item.openingElement != null &&
            item.openingElement.type === "JSXOpeningElement" &&
            elementType(item.openingElement) === "Field"
        ) {
            field = true;
        }
    });

    return field;
}

module.exports = {
    hasFieldParent
};
