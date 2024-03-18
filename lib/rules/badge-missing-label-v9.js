// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy, isInsideLabelTag, hasAssociatedLabelViaHtmlFor } = require("../util/labelUtils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        messages: {
            noUnlabelledBadge: "Accessibility: Badge must have an accessible label"
        },
        type: "problem",
        docs: {
            description: "Accessibility: Badge must have an accessible label",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    create(context) {
        return {
            JSXOpeningElement(node) {
                if (elementType(node) !== "Badge") {
                    return;
                }

                if (
                    hasNonEmptyProp(node.attributes, "content") ||
                    isInsideLabelTag(context) ||
                    hasAssociatedLabelViaHtmlFor(node, context) ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context)
                ) {
                    return;
                }

                context.report({
                    node,
                    messageId: `noUnlabelledBadge`
                });
            }
        };
    }
};

