"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const labelUtils_1 = require("../util/labelUtils");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
const hasTooltipParent_1 = require("../util/hasTooltipParent");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledMenuItem: "Accessibility: MenuItem must have an accessible label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        docs: {
            description: "Accessibility: MenuItem without label must have an accessible and visual label: aria-labelledby",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: [] // Add a schema if the rule has options
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a MenuItem, return
                if ((0, jsx_ast_utils_1.elementType)(openingElement) !== "MenuItem") {
                    return;
                }
                // if the MenuItem has a text, label or an associated label, return
                if ((0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "aria-label") || //aria-label, not recommended but will work for screen reader users
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(openingElement, context) || // aria-labelledby
                    (0, hasTextContentChild_1.hasTextContentChild)(node) || // has text content
                    (0, hasTooltipParent_1.hasToolTipParent)(context) // has tooltip parent, not recommended but will work for screen reader users
                ) {
                    return;
                }
                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledMenuItem`
                });
            }
        };
    }
});
exports.default = rule;
