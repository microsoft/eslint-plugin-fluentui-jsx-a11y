// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const { hasToolTipParent } = require("../util/hasTooltipParent");
const { hasTextContentChild } = require("../util/hasTextContentChild");
const { hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");
var elementType = require("jsx-ast-utils").elementType;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: "Accessibility: Toggle buttons must have an accessible name"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description:
                "Accessibility: Toggle buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;

                // if it is not a Toggle button, return
                if (elementType(openingElement) !== "ToggleButton") {
                    return;
                }

                // if it has a tooltip parent, return
                if (hasToolTipParent(context)) {
                    return;
                }

                // if it has text content, return
                if (hasTextContentChild(node)) {
                    return;
                }

                // the button has an associated label
                if (hasAssociatedLabelViaAriaLabelledBy(openingElement, context)) {
                    return;
                }

                const hasAccessibleLabelling =
                    hasNonEmptyProp(openingElement.attributes, "title") || hasNonEmptyProp(openingElement.attributes, "aria-label");

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

