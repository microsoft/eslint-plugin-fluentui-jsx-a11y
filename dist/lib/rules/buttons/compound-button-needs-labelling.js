"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../../util/hasNonEmptyProp");
const hasTooltipParent_1 = require("../../util/hasTooltipParent");
const hasTextContentChild_1 = require("../../util/hasTextContentChild");
const labelUtils_1 = require("../../util/labelUtils");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: "Accessibility: Compound buttons must have an accessible name"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Compound buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a Compound button, return
                if ((0, jsx_ast_utils_1.elementType)(openingElement) !== "CompoundButton") {
                    return;
                }
                // if it has a tooltip parent Or has text content Or has an associated label or has secondaryContent, return
                if ((0, hasTooltipParent_1.hasToolTipParent)(context) ||
                    (0, hasTextContentChild_1.hasTextContentChild)(node) ||
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(openingElement, context) ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "secondaryContent")) {
                    return;
                }
                const hasAccessibleLabelling = (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "title") || (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "aria-label");
                // if it has no accessible name, report error
                if (!hasAccessibleLabelling) {
                    context.report({
                        node,
                        messageId: `missingAriaLabel`
                    });
                }
            }
        };
    }
});
exports.default = rule;
