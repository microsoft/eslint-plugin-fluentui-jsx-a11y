// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const { hasToolTipParent } = require("../util/hasTooltipParent");
const { hasTextContentChild } = require("../util/hasTextContentChild");
var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        messages: {
            noAccessibleNameBadge: "Accessibility: Badge must have an accessible name"
        },
        type: "problem",
        docs: {
            description: "Accessibility: Badge must have an accessible name",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    create(context) {
        return {
            JSXElement(node) {
                const openingElement = node.openingElement;

                if (elementType(openingElement) !== "Badge") {
                    return;
                }

                if (
                    hasToolTipParent(context) ||
                    hasTextContentChild(node) ||
                    hasAssociatedLabelViaAriaLabelledBy(openingElement, context) ||
                    hasNonEmptyProp(openingElement.attributes, "aria-label")
                ) {
                    return;
                }

                context.report({
                    node,
                    messageId: `noAccessibleNameBadge`
                });
            }
        };
    }
};

