// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { elementType } = require("jsx-ast-utils");

const { isInsideLabelTag, hasAssociatedLabelViaHtmlFor, hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");

const applicableComponents = ["Input", "Slider"];

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabelOnInput: `Accessibility - input fields must have a aria label associated with it: ${applicableComponents.join(
                ", "
            )}`
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Input fields must have accessible labelling: aria-label, aria-labelledby or an associated label",
            recommended: true,
            url: "https://www.w3.org/WAI/tutorials/forms/labels/" // URL to the documentation page for this rule
        },
        schema: []
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a listed component, return
                if (!applicableComponents.includes(elementType(node))) {
                    return;
                }

                // wrapped in Label tag, labelled with htmlFor, labelled with aria-labelledby
                if (
                    isInsideLabelTag(context) ||
                    hasAssociatedLabelViaHtmlFor(node, context) ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context)
                ) {
                    return;
                }

                context.report({
                    node,
                    messageId: `missingLabelOnInput`
                });
            }
        };
    }
};
