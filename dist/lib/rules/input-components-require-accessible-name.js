"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const labelUtils_1 = require("../util/labelUtils");
const hasFieldParent_1 = require("../util/hasFieldParent");
const inputBasedComponents_1 = require("../applicableComponents/inputBasedComponents");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabelOnInput: `Accessibility - input fields must have a aria label associated with it: ${inputBasedComponents_1.applicableComponents.join(", ")}`
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Input fields must have accessible labelling: aria-label, aria-labelledby or an associated label",
            recommended: "strict",
            url: "https://www.w3.org/WAI/tutorials/forms/labels/" // URL to the documentation page for this rule
        },
        schema: []
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a listed component, return
                if (!inputBasedComponents_1.applicableComponents.includes((0, jsx_ast_utils_1.elementType)(node))) {
                    return;
                }
                // wrapped in Label tag, labelled with htmlFor, labelled with aria-labelledby
                if ((0, hasFieldParent_1.hasFieldParent)(context) ||
                    (0, labelUtils_1.isInsideLabelTag)(context) ||
                    (0, labelUtils_1.hasAssociatedLabelViaHtmlFor)(node, context) ||
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context)) {
                    return;
                }
                context.report({
                    node,
                    messageId: `missingLabelOnInput`
                });
            }
        };
    }
});
exports.default = rule;
