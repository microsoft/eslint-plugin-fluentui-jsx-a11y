// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: "Accessibility: Avatar must have an accessible name"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            // DONE
            description: "Accessibility: Avatar must have an accessible labelling: name, aria-label, aria-labelledby",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not an Avatar, return
                if (elementType(node) !== "Avatar") {
                    return;
                }
                // if the Avatar has a name, aria-label or aria-labelledby, return
                if (hasNonEmptyProp(node.attributes, "name") ||
                    hasNonEmptyProp(node.attributes, "aria-label") ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context)) {
                    return;
                }
                // no aria
                context.report({
                    node,
                    messageId: `missingAriaLabel`
                });
            }
        };
    }
};
