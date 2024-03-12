// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy, hasAssociatedLabelViaHtmlFor } = require("../util/labelUtils");
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");

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
            description: "Accessibility: Dropdown menu must have an id and it needs to be linked via htmlFor of a Label",
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
                // if it is not a Dropdown, return
                if (elementType(node) !== "Dropdown") {
                    return;
                }

                // if the dropdown has a aria-LabeledBy with same value present in id of Label, return (Most recommended)
                // if the dropdown has an id and a label with htmlFor with sanme value as id, return
                // if the dropdown has an associated label, return
                if (
                    hasAssociatedLabelViaHtmlFor(node, context) ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context) ||
                    hasNonEmptyProp(node.attributes, "aria-label")
                ) {
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
