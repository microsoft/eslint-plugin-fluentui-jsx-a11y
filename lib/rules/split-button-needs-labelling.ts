// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { JSXOpeningElement } from "estree-jsx";

export default ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        docs: {
            description: "Accessibility: SplitButton must have text content or accessible name on primaryActionButton prop.",
            recommended: "strict",
            url: "https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/"
        },
        messages: {
            noUnlabeledSplitButton:
                "SplitButton must have text content, or an accessible name on the primaryActionButton prop (e.g., aria-label). Labeling the SplitButton itself is not valid."
        },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        return {
            JSXElement(node: TSESTree.JSXElement) {
                const opening = node.openingElement;
                const name = elementType(opening as unknown as JSXOpeningElement);
                if (name !== "SplitButton") return;

                // 1. Check for any non-empty text child
                const hasTextContent = node.children.some(child => child.type === "JSXText" && child.value.trim().length > 0);
                if (hasTextContent) return;

                // 2. Check for primaryActionButton prop with aria-label
                const primaryActionButtonProp = opening.attributes.find(
                    attr => attr.type === "JSXAttribute" && attr.name.name === "primaryActionButton"
                );
                if (
                    primaryActionButtonProp &&
                    primaryActionButtonProp.type === "JSXAttribute" &&
                    primaryActionButtonProp.value &&
                    primaryActionButtonProp.value.type === "JSXExpressionContainer"
                ) {
                    const expr = primaryActionButtonProp.value.expression;
                    // Only handle object literals
                    if (expr.type === "ObjectExpression") {
                        const hasAriaLabel = expr.properties.some(
                            prop =>
                                prop.type === "Property" &&
                                ((prop.key.type === "Identifier" && prop.key.name === "aria-label") ||
                                    (prop.key.type === "Literal" && prop.key.value === "aria-label")) &&
                                prop.value.type === "Literal" &&
                                typeof prop.value.value === "string" &&
                                prop.value.value.trim().length > 0
                        );
                        if (hasAriaLabel) return;
                    }
                }

                // 3. Otherwise, report error
                context.report({ node: opening, messageId: "noUnlabeledSplitButton" });
            }
        };
    }
});
