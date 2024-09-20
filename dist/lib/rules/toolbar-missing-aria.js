"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const labelUtils_1 = require("../util/labelUtils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabelOnToolbar: "Toolbars need accessible labelling: aria-label or aria-labelledby"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Toolbars need accessible labelling: aria-label or aria-labelledby",
            recommended: "strict",
            url: "https://www.w3.org/WAI/tutorials/forms/labels/" // URL to the documentation page for this rule
        },
        schema: []
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a Toolbar, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "Toolbar") {
                    return;
                }
                // if the Toolbar has aria labelling, return
                if ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") || (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context)) {
                    return;
                }
                context.report({
                    node,
                    messageId: `missingLabelOnToolbar`
                });
            }
        };
    }
});
exports.default = rule;
