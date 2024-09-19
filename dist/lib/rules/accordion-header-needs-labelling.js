// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const { hasToolTipParent } = require("../util/hasTooltipParent");
const { hasTextContentChild } = require("../util/hasTextContentChild");
const { hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");
var hasProp = require("jsx-ast-utils").hasProp;
var elementType = require("jsx-ast-utils").elementType;
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        messages: {
            missingAriaLabel: "Accessibility: the accordion header must have an accessible name"
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "The accordion header is a button and it needs an accessibile name e.g. text content, aria-label, aria-labelledby.",
            recommended: false,
            url: null // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a AccordionHeader, return
                if (elementType(openingElement) !== "AccordionHeader") {
                    return;
                }
                // if it has text content, return
                if (hasTextContentChild(node)) {
                    return;
                }
                // if it is not an icon button, return
                if (!hasProp(openingElement.attributes, "icon") && !hasProp(openingElement.attributes, "expandIcon")) {
                    return;
                }
                // if it has a tooltip parent, return
                if (hasToolTipParent(context)) {
                    return;
                }
                // the button has an associated label
                if (hasAssociatedLabelViaAriaLabelledBy(openingElement, context)) {
                    return;
                }
                const hasAccessibleLabelling = hasNonEmptyProp(openingElement.attributes, "title") || hasNonEmptyProp(openingElement.attributes, "aria-label");
                // if it has no accessible name, report error
                if (!hasAccessibleLabelling) {
                    context.report({
                        node,
                        messageId: `missingAriaLabel`
                    });
                }
            }
        };
    }
};
