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
            noUnlabeledRadioButton: "Accessibility: Radio button without label must have an accessible and visual label: aria-labelledby"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            // DONE
            description: "Accessibility: Radio button without label must have an accessible and visual label: aria-labelledby",
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
                // if it is not a Checkbox, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "Radio") {
                    return;
                }
                // if the Checkbox has a label, if the Switch has an associated label, return
                if ((0, hasFieldParent_1.hasFieldParent)(context) ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "label") ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") ||
                    (0, labelUtils_1.isInsideLabelTag)(context) ||
                    (0, labelUtils_1.hasAssociatedLabelViaHtmlFor)(node, context) ||
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context)) {
                    return;
                }
                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabeledRadioButton`
                });
            }
        };
    }
});
exports.default = rule;
