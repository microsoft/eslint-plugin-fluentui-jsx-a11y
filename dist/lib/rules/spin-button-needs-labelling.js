// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
var elementType = require("jsx-ast-utils").elementType;
const { hasAssociatedLabelViaAriaLabelledBy, isInsideLabelTag, hasAssociatedLabelViaHtmlFor } = require("../util/labelUtils");
const { hasFieldParent } = require("../util/hasFieldParent");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledSpinButton: "Accessibility: SpinButtons must have an accessible label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: SpinButtons must have an accessible label",
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
                // if it is not a SpinButton, return
                if (elementType(node) !== "SpinButton") {
                    return;
                }
                // if the SpinButton has an associated label, return
                if (hasFieldParent(context) ||
                    isInsideLabelTag(context) ||
                    hasAssociatedLabelViaHtmlFor(node, context) ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context)) {
                    return;
                }
                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledSpinButton`
                });
            }
        };
    }
};
