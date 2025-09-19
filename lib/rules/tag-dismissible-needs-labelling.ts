// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType, hasProp, getProp, getPropValue } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { JSXOpeningElement, JSXAttribute } from "estree-jsx";

//------------------------------------------------------------------------------
// Utility Functions
//------------------------------------------------------------------------------

/**
 * Checks if a value is a non-empty string
 */
const isNonEmptyString = (value: any): boolean => {
    return typeof value === "string" && value.trim().length > 0;
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        type: "problem",
        docs: {
            description:
                "This rule aims to ensure that dismissible Tag components have proper accessibility labelling: either aria-label on dismissIcon or aria-label on Tag with role on dismissIcon",
            recommended: "strict",
            url: "https://react.fluentui.dev/?path=/docs/components-tag-tag--docs"
        },
        fixable: undefined,
        schema: [],
        messages: {
            missingDismissLabel:
                "Accessibility: Dismissible Tag must have either aria-label on dismissIcon or aria-label on Tag with role on dismissIcon"
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

                // Check if Tag has dismissible prop
                const isDismissible = hasProp(openingElement.attributes as JSXAttribute[], "dismissible");
                if (!isDismissible) {
                    return;
                }

                // Check if dismissible Tag has proper accessibility labelling
                const dismissIconProp = getProp(openingElement.attributes as JSXAttribute[], "dismissIcon");
                if (!dismissIconProp) {
                    context.report({
                        node,
                        messageId: `missingDismissLabel`
                    });
                    return;
                }

                const dismissIconValue = getPropValue(dismissIconProp);

                // Check if dismissIcon has aria-label
                const dismissIconHasAriaLabel =
                    dismissIconValue && typeof dismissIconValue === "object" && isNonEmptyString((dismissIconValue as any)["aria-label"]);

                // Check if dismissIcon has role
                const dismissIconHasRole =
                    dismissIconValue && typeof dismissIconValue === "object" && isNonEmptyString((dismissIconValue as any)["role"]);

                // Check if Tag has aria-label (required when dismissIcon has role)
                const tagHasAriaLabel = hasNonEmptyProp(openingElement.attributes, "aria-label");
                // Valid patterns:
                // Option 1: dismissIcon has aria-label
                // Option 2: Tag has aria-label and dismissIcon has role
                const hasValidLabelling = dismissIconHasAriaLabel || (tagHasAriaLabel && dismissIconHasRole);
                if (!hasValidLabelling) {
                    context.report({
                        node,
                        messageId: `missingDismissLabel`
                    });
                }
            }
        };
    }
});

export default rule;
