// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
var elementType = require("jsx-ast-utils").elementType;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabelOnBadge: "Badge need accessible labelling: aria-label or aria-labelledby"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Badge need accessible labelling: aria-label or aria-labelledby",
            recommended: true
        },
        schema: []
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a Badge, return
                if (elementType(node) !== "Badge") {
                    return;
                }

                // if the Badge has aria labelling, return
                if (hasNonEmptyProp(node.attributes, "aria-label") || hasAssociatedLabelViaAriaLabelledBy(node, context)) {
                    return;
                }

                context.report({
                    node,
                    messageId: `missingLabelOnBadge`
                });
            }
        };
    }
};

