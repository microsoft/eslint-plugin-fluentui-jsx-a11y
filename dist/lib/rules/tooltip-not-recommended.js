// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
var elementType = require("jsx-ast-utils").elementType;
const { hasToolTipParent } = require("../util/hasTooltipParent");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
// Define an array of allowed component names
const allowedComponents = ["MenuItem", "SpinButton"];
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible error messages for the lint rule
        messages: {
            tooltipNotRecommended: `Accessibility: Tooltop not recommended for these components ${allowedComponents.join(", ")}`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: `Accessibility: Prefer text content or aria over a tooltip for these components ${allowedComponents.join(", ")}`,
            recommended: true,
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
                // if it is not a listed component, return
                if (!allowedComponents.includes(elementType(openingElement))) {
                    return;
                }
                // if there are is tooltip, report
                if (hasToolTipParent(context)) {
                    context.report({
                        node,
                        messageId: `tooltipNotRecommended`
                    });
                }
            }
        };
    }
};
