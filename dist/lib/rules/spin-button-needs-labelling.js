"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
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
            noUnlabelledSpinButton: "Accessibility: SpinButtons must have an accessible label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: SpinButtons must have an accessible label",
            recommended: "strict",
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
                if ((0, jsx_ast_utils_1.elementType)(node) !== "SpinButton") {
                    return;
                }
                // if the SpinButton has an associated label, return
                if ((0, hasFieldParent_1.hasFieldParent)(context) ||
                    (0, labelUtils_1.isInsideLabelTag)(context) ||
                    (0, labelUtils_1.hasAssociatedLabelViaHtmlFor)(node, context) ||
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context)) {
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
});
exports.default = rule;
