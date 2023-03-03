// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var elementType = require("jsx-ast-utils").elementType;

function hasToolTipParent(context) {
    const ancestors = context.getAncestors();

    if (ancestors == null || ancestors.length === 0) {
        return false;
    }

    var toolTip = false;

    ancestors.forEach(item => {
        if (
            item.type === "JSXElement" &&
            item.openingElement != null &&
            item.openingElement.type === "JSXOpeningElement" &&
            elementType(item.openingElement) === "Tooltip"
        ) {
            toolTip = true;
        }
    });

    return toolTip;
}

module.exports = {
    hasToolTipParent
};
