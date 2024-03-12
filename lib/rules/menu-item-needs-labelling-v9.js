// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy, isInsideLabelTag } = require("../util/labelUtils");
const { hasTextContentChild } = require("../util/hasTextContentChild");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledMenuItem: "Accessibility: MenuItem must have an accessible label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        docs: {
            description: "Accessibility: MenuItem without label must have an accessible and visual label: aria-labelledby",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        console.log("nikitahi", context);
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a MenuItem, return
                if (elementType(node) !== "MenuItem") {
                    return;
                }

                // if the MenuItem has a text, label or an associated label, return
                if (
                    hasNonEmptyProp(node.attributes, "aria-label") || //aria-label, not recommended but will work for screen reader users
                    isInsideLabelTag(context) || // wrapped in label tag
                    hasAssociatedLabelViaAriaLabelledBy(node, context) || // aria-labelledby
                    hasTextContentChild(node) // has text content
                ) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledMenuItem`
                });
            }
        };
    }
};

