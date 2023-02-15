/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

var elementType = require("jsx-ast-utils").elementType;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the lint rule
        messages: {
            noEmptyButtons: "Accessibility: no empty buttons"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: buttons must either text content or accessible labelling",
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

                // if there are no props, report error
                if (node.attributes.length === 0) {
                    context.report({
                        node,
                        messageId: `noEmptyButtons`
                    });
                }
            }
        };
    }
};
