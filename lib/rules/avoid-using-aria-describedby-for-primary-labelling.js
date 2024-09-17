// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { applicableComponents: inputComponents } = require("../applicableComponents/inputBasedComponents");
const { applicableComponents: buttonComponents } = require("../applicableComponents/buttonBasedComponents");
const { elementType } = require("jsx-ast-utils");
const {
    isInsideLabelTag,
    hasAssociatedLabelViaHtmlFor,
    hasAssociatedLabelViaAriaLabelledBy,
    hasAssociatedLabelViaAriaDescribedby
} = require("../util/labelUtils");

const { hasFieldParent } = require("../util/hasFieldParent");
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const { hasToolTipParent } = require("../util/hasTooltipParent");
const { hasTextContentChild } = require("../util/hasTextContentChild");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        messages: {
            noAriaDescribedbyAsLabel: "Accessibility: aria-describedby provides additional context and is not meant for primary labeling."
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "aria-describedby provides additional context and is not meant for primary labeling.",
            recommended: true,
            url: null // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            JSXElement(node) {
                const openingElement = node.openingElement;

                if (
                    buttonComponents.includes(elementType(openingElement)) && // It's a button-based component
                    !hasToolTipParent(context) && // It doesn't have a tooltip parent
                    !hasTextContentChild(node) && // It doesn't have text content
                    !hasNonEmptyProp(openingElement.attributes, "title") && // Doesn't have a title
                    !hasNonEmptyProp(openingElement.attributes, "aria-label") && // Doesn't have an aria-label
                    !hasAssociatedLabelViaAriaLabelledBy(openingElement, context) && // Doesn't have aria-labelledby
                    hasAssociatedLabelViaAriaDescribedby(openingElement, context) // But it does have aria-describedby
                ) {
                    context.report({
                        node,
                        messageId: "noAriaDescribedbyAsLabel"
                    });
                }

                if (
                    inputComponents.includes(elementType(openingElement)) && // It's an input component
                    !hasFieldParent(context) && // It doesn't have a field parent
                    !isInsideLabelTag(context) && // It's not inside a label tag
                    !hasAssociatedLabelViaHtmlFor(openingElement, context) && // Doesn't have a label via htmlFor
                    !hasAssociatedLabelViaAriaLabelledBy(openingElement, context) && // Doesn't have aria-labelledby
                    hasAssociatedLabelViaAriaDescribedby(openingElement, context) // But it does have aria-describedby
                ) {
                    context.report({
                        node,
                        messageId: "noAriaDescribedbyAsLabel"
                    });
                }
            }
        };
    }
};
