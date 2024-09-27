// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const labelUtils_1 = require("../util/labelUtils");
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: 'Accessibility - ratings must have an accessible name or an itemLabel that generates an aria label'
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Ratings must have accessible labelling: name, aria-label, aria-labelledby or itemLabel which generates aria-label",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a listed component, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "Rating") {
                    return;
                }
                // wrapped in Label tag, labelled with htmlFor, labelled with aria-labelledby
                if ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "itemLabel") ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "name") ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") ||
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(node, context)) {
                    return;
                }
                context.report({
                    node,
                    messageId: `missingAriaLabel`
                });
            }
        };
    }
});
exports.default = rule;
