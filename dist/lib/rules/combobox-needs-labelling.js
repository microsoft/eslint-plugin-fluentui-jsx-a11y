"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const labelUtils_1 = require("../util/labelUtils");
const hasFieldParent_1 = require("../util/hasFieldParent");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
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
        schema: [] // Add a schema if the rule has options
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a Combobox, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "Combobox") {
                    return;
                }
                // if the Combobox has a label, if the Combobox has an associated label, return
                if ((0, hasFieldParent_1.hasFieldParent)(context) ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") || //aria-label, not recommended but will work for screen reader users
                    (0, labelUtils_1.isInsideLabelTag)(context) || // wrapped in label
                    (0, labelUtils_1.hasAssociatedLabelViaHtmlFor)(node, context) || // label with htmlFor
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context) // aria-labelledby
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
});
exports.default = rule;
