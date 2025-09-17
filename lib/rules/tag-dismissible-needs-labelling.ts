// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType, hasProp, getProp, getPropValue } from "jsx-ast-utils";
import { JSXOpeningElement, JSXAttribute } from "estree-jsx";

//------------------------------------------------------------------------------
// Utility Functions
//------------------------------------------------------------------------------

/**
 * Checks if a value is a non-empty string (same logic as hasNonEmptyProp for strings)
 */
const isNonEmptyString = (value: any): boolean => {
    return typeof value === "string" && value.trim().length > 0;
};

/**
 * Checks if an object has a non-empty string property
 */
const hasNonEmptyObjectProperty = (obj: any, propertyName: string): boolean => {
    if (!obj || typeof obj !== "object") return false;
    return isNonEmptyString(obj[propertyName]);
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
                "This rule aims to ensure that dismissible Tag components have an aria-label on the dismiss button",
            recommended: false
        },
        fixable: undefined,
        schema: [],
        messages: {
            missingDismissLabel: "Accessibility: Dismissible Tag must have dismissIcon with aria-label"
        },
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

                // Check if dismissible Tag has dismissIcon with aria-label
                const dismissIconProp = getProp(openingElement.attributes as JSXAttribute[], "dismissIcon");
                
                if (!dismissIconProp) {
                    context.report({
                        node,
                        messageId: `missingDismissLabel`
                    });
                    return;
                }

                // Get the dismissIcon value and check if it has valid aria-label
                const dismissIconValue = getPropValue(dismissIconProp);
                
                if (!hasNonEmptyObjectProperty(dismissIconValue, "aria-label")) {
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
