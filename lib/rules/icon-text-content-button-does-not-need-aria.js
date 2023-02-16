// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

var hasProp = require("jsx-ast-utils").hasProp;
var elementType = require("jsx-ast-utils").elementType;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            unnecessaryAriaLabelling: "Accessibility: an image button with text content does not need aria labelling"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: an image button with text content does not need aria labelling. The button already has an accessible name and the aria-label or aria-labelledby will override the text content for screen reader users.",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: [] // no options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a button, return
                if (elementType(node) !== "Button") {
                    return;
                }

                // if it is not an image button, return
                if (!hasProp(node.attributes, "icon")) {
                    return;
                }

                // if the button does not have text content, return
                if (!hasProp(node.attributes, "content")) {
                    return;
                }

                /**
                 * aria-label overrides content
                 * aria-labelledby overrides content
                 * omitted aria-describedby because it is also announced and does not override button content.
                 * */
                const hasAccessibleLabelling =
                    hasProp(node.attributes, "aria-label") ||
                    hasProp(node.attributes, "aria-labelledby");

                // if it does not have accessible labelling, return
                if (!hasAccessibleLabelling) {
                    return;
                }

                // if it has both content and aria, report error
                context.report({
                    node,
                    messageId: `unnecessaryAriaLabelling`
                });
                
            }
        };
    }
};
