/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

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
            preferAriaOverTitle: "Accessibility: prefer wai-aria over title or placeholder attributes"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description:
                "Accessibility: prefer wai-aria over title or placeholder attributes. Title/placeholder can be used in addition to wai-aria. aria-label, aria-labelledby, aria-describedby",
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

                // if the button has text content, return
                if (hasProp(node.attributes, "content")) {
                    return;
                }

                const isIconButton = hasProp(node.attributes, "icon");
                const hasAccessibleLabelling =
                    hasProp(node.attributes, "aria-label") ||
                    hasProp(node.attributes, "aria-labelledby") ||
                    hasProp(node.attributes, "aria-describedby");

                // prefer aria over title
                if (isIconButton && !hasAccessibleLabelling && hasProp(node.attributes, "title")) {
                    context.report({
                        node,
                        messageId: `preferAriaOverTitle`
                    });
                }
            }
        };
    }
};
