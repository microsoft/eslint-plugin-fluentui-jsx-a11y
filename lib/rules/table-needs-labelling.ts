// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { hasFieldParent } from "../util/hasFieldParent";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            missingTableLabelling:
                "Accessibility: Table must have an accessible name via aria-label, aria-labelledby, caption element, or Field wrapper",
            missingTableStructure: "Accessibility: Table should contain TableHeader and TableBody for proper structure"
        },
        type: "problem",
        docs: {
            description: "Accessibility: Table must have proper labelling and semantic structure for screen readers",
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
        },
        schema: []
    },
    create(context) {
        return {
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it is not a Table, return
                if (elementType(openingElement as JSXOpeningElement) !== "Table") {
                    return;
                }

                // Check if Table is wrapped in a Field component
                const hasFieldParentCheck = hasFieldParent(context);

                // Check for caption child element with meaningful content
                const hasValidCaption = node.children.some(child => {
                    if (child.type === "JSXElement" && elementType(child.openingElement as JSXOpeningElement) === "caption") {
                        // Check if caption has text content
                        return hasTextContentChild(child);
                    }
                    return false;
                });

                // Check for ARIA labeling
                const hasAriaLabel = hasNonEmptyProp(openingElement.attributes, "aria-label");
                const hasAriaLabelledBy = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);

                // Table can be labeled via multiple methods
                const hasAccessibleName = hasFieldParentCheck || hasValidCaption || hasAriaLabel || hasAriaLabelledBy;

                if (!hasAccessibleName) {
                    context.report({
                        node: openingElement,
                        messageId: "missingTableLabelling"
                    });
                }
            }
        };
    }
});

export default rule;
