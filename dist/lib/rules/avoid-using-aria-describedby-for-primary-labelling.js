"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const inputBasedComponents_1 = require("../applicableComponents/inputBasedComponents");
const buttonBasedComponents_1 = require("../applicableComponents/buttonBasedComponents");
const labelUtils_1 = require("../util/labelUtils");
const hasFieldParent_1 = require("../util/hasFieldParent");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const hasTooltipParent_1 = require("../util/hasTooltipParent");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            noAriaDescribedbyAsLabel: "Accessibility: aria-describedby provides additional context and is not meant for primary labeling."
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "aria-describedby provides additional context and is not meant for primary labeling.",
            recommended: "strict"
        },
        schema: [] // Add a schema if the rule has options
    },
    create(context) {
        return {
            JSXElement(node) {
                const openingElement = node.openingElement;
                if (buttonBasedComponents_1.applicableComponents.includes((0, jsx_ast_utils_1.elementType)(openingElement)) && // It's a button-based component
                    !(0, hasTooltipParent_1.hasToolTipParent)(context) && // It doesn't have a tooltip parent
                    !(0, hasTextContentChild_1.hasTextContentChild)(node) && // It doesn't have text content
                    !(0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "title") && // Doesn't have a title
                    !(0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "aria-label") && // Doesn't have an aria-label
                    !(0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(openingElement, context) && // Doesn't have aria-labelledby
                    (0, labelUtils_1.hasAssociatedLabelViaAriaDescribedby)(openingElement, context) // But it does have aria-describedby
                ) {
                    context.report({
                        node,
                        messageId: "noAriaDescribedbyAsLabel"
                    });
                }
                if (inputBasedComponents_1.applicableComponents.includes((0, jsx_ast_utils_1.elementType)(openingElement)) && // It's an input component
                    !(0, hasFieldParent_1.hasFieldParent)(context) && // It doesn't have a field parent
                    !(0, labelUtils_1.isInsideLabelTag)(context) && // It's not inside a label tag
                    !(0, labelUtils_1.hasAssociatedLabelViaHtmlFor)(openingElement, context) && // Doesn't have a label via htmlFor
                    !(0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(openingElement, context) && // Doesn't have aria-labelledby
                    (0, labelUtils_1.hasAssociatedLabelViaAriaDescribedby)(openingElement, context) // But it does have aria-describedby
                ) {
                    context.report({
                        node,
                        messageId: "noAriaDescribedbyAsLabel"
                    });
                }
            }
        };
    }
});
exports.default = rule;
