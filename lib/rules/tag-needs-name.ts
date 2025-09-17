// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        type: "problem",
        docs: {
            description:
                "This rule aims to ensure that Tag component have an accessible name via text content, aria-label, or aria-labelledby.",
            recommended: "strict",
            url: "https://react.fluentui.dev/?path=/docs/components-tag-tag--docs"
        },
        fixable: undefined,
        schema: [],
        messages: {
            missingAriaLabel: "Accessibility: Tag must have an accessible name"
        }
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it is not a Tag, return
                if (elementType(openingElement as JSXOpeningElement) !== "Tag") {
                    return;
                }

                // Check if tag has any accessible name
                const hasTextContent = hasTextContentChild(node);
                const hasAriaLabel = hasNonEmptyProp(openingElement.attributes, "aria-label");
                const hasAriaLabelledBy = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);
                const hasAccessibleName = hasTextContent || hasAriaLabel || hasAriaLabelledBy;

                if (!hasAccessibleName) {
                    context.report({
                        node,
                        messageId: `missingAriaLabel`
                    });
                }
            }
        };
    }
});

export default rule;
