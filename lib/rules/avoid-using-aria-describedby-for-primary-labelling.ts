// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";
import { elementType } from "jsx-ast-utils";
import { applicableComponents as inputComponents } from "../applicableComponents/inputBasedComponents";
import { applicableComponents as buttonComponents } from "../applicableComponents/buttonBasedComponents";
import {
    isInsideLabelTag,
    hasAssociatedLabelViaHtmlFor,
    hasAssociatedLabelViaAriaLabelledBy,
    hasAssociatedLabelViaAriaDescribedby
} from "../util/labelUtils";
import { hasFieldParent } from "../util/hasFieldParent";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasToolTipParent } from "../util/hasTooltipParent";
import { hasTextContentChild } from "../util/hasTextContentChild";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
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
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                if (
                    buttonComponents.includes(elementType(openingElement as JSXOpeningElement)) && // It's a button-based component
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
                    inputComponents.includes(elementType(openingElement as JSXOpeningElement)) && // It's an input component
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
});

export default rule;
