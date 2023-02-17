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
            noUnlabelledCheckboxes: "Accessibility: Checkboxes without label must have accessible labelling: aria-label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            // DONE
            description:
                "Accessibility: Checkboxes without label must have accessible labelling: aria-label, aria-labelledby, aria-describedby",
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
                // if it is not a Checkbox, return
                if (elementType(node) !== "Checkbox") {
                    return;
                }

                // if the button has label, return
                if (hasProp(node.attributes, "label")) {
                    return;
                }

                // const isIconButton = hasProp(node.attributes, "icon");
                const hasAccessibleLabelling =
                    hasProp(node.attributes, "aria-label") ||
                    hasProp(node.attributes, "aria-labelledby") ||
                    hasProp(node.attributes, "aria-describedby");

                // if it has no aria-label, aria-labbeledby, or aria-describedby, report error
                if (!hasAccessibleLabelling) {
                    context.report({
                        node,
                        messageId: `noUnlabelledCheckboxes`
                    });
                }
            }
        };
    }
};
