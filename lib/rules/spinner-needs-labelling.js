// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const elementType = require("jsx-ast-utils").elementType;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledSpinner: "Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes",
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
                // if it is not a Spinner, return
                if (elementType(node) !== "Spinner") {
                    return;
                }

                if (hasNonEmptyProp(node.attributes, "aria-busy")
                    && hasNonEmptyProp(node.attributes, "aria-live")
                    && (hasNonEmptyProp(node.attributes, "label") || hasNonEmptyProp(node.attributes, "aria-label"))
                ) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledSpinner`
                });
            }
        };
    }
};

