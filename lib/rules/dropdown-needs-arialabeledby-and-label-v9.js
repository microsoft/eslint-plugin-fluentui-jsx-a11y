// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabelOrAriaLabeledByInDropdown: "Accessibility: Dropdown mising label or missing aria-labelledby"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Dropdown menu must have a visual label and it needs to be linked via aria-labelledby",
            recommended: true,
            url: null
        },
        schema: []
    },

    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a Checkbox, return
                if (elementType(node) !== "Dropdown") {
                    return;
                }

                // if the dropdown has a aria-LabeledBy with same valye  return
                if (hasAssociatedLabelViaAriaLabelledBy(node, context)) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `missingLabelOrAriaLabeledByInDropdown`
                });
            }
        };
    }
};
