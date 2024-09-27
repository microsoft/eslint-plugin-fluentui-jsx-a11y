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
            noUnlabelledBreadcrumb: "Accessibility: Breadcrumb must have an accessible label"
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
                // if it is not a Breadcrumb, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "Breadcrumb") {
                    return;
                }
                // if the Breadcrumb has a label, if the Breadcrumb has an associated label, return
                if ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") || //aria-label
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context) // aria-labelledby
                ) {
                    return;
                }
                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledBreadcrumb`
                });
            }
        };
    }
});
exports.default = rule;
