"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledSpinner: "Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes",
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
                // if it is not a Spinner, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "Spinner") {
                    return;
                }
                if ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-busy") &&
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-live") &&
                    ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "label") || (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label"))) {
                    return;
                }
                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledSpinner`
                });
            }
        };
    }
});
exports.default = rule;
