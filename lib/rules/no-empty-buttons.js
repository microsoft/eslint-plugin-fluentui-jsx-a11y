// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
            JSXElement(node) {
                const openingElement = node.openingElement;

                // if it is not a button, return
                if (elementType(openingElement) !== "Button") {
                    return;
                }

                const hasProps = openingElement.attributes.length > 0;
                const hasChildren = node.children.length > 0;

                // if there are no props and no children, report error
                if (!hasProps && !hasChildren) {
                    context.report({
                        node,
                        messageId: `noEmptyButtons`
                    });
                }
            }
        };
    }
};
