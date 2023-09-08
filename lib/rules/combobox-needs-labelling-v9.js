// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy, isInsideLabelTag, hasAssociatedLabelViaHtmlFor } = require("../util/labelUtils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledCombobox: "Accessibility: Combobox must have an accessible label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        docs: {
            description: "All interactive elements must have an accessible name",
            recommended: false,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a Combobox, return
                if (elementType(node) !== "Combobox") {
                    return;
                }

                // if the Combobox has a label, if the Combobox has an associated label, return
                if (
                    hasNonEmptyProp(node.attributes, "aria-label") || //aria-label, not recommended but will work for screen reader users
                    isInsideLabelTag(context) || // wrapped in label
                    hasAssociatedLabelViaHtmlFor(node, context) || // label with htmlFor
                    hasAssociatedLabelViaAriaLabelledBy(node, context) // aria-labelledby
                ) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledCombobox`
                });
            }
        };
    }
};

