"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const labelUtils_1 = require("../util/labelUtils");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: "Accessibility: Avatar must have an accessible name"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            // DONE
            description: "Accessibility: Avatar must have an accessible labelling: name, aria-label, aria-labelledby",
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
                // if it is not an Avatar, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "Avatar") {
                    return;
                }
                // if the Avatar has a name, aria-label or aria-labelledby, return
                if ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "name") ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") ||
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context)) {
                    return;
                }
                // no aria
                context.report({
                    node,
                    messageId: `missingAriaLabel`
                });
            }
        };
    }
});
exports.default = rule;
