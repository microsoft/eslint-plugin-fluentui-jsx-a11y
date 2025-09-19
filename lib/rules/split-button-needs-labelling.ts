// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule(
        {
            component: "SplitButton",
            messageId: "noUnlabeledSplitButton",
            description: "Accessibility: SplitButton must have text content or accessible name on primaryActionButton prop.",
            labelProps: [],
            allowFieldParent: false,
            allowHtmlFor: false,
            allowLabelledBy: false,
            allowWrappingLabel: false,
            allowTooltipParent: false,
            allowDescribedBy: false,
            allowLabeledChild: false,
            allowTextContentChild: false
        },
        isSplitButtonAccessiblyLabeled
    )
);

/**
 * Custom accessibility checker for SplitButton:
 * 1. Accessible if it has any non-empty text child.
 * 2. If not, must have primaryActionButton prop with aria-label.
 * 3. All other labeling strategies are invalid.
 */
export function isSplitButtonAccessiblyLabeled(node: TSESTree.JSXElement): boolean {
    // 1. Check for any non-empty text child
    const hasTextContent = node.children.some(child => child.type === "JSXText" && child.value.trim().length > 0);
    if (hasTextContent) return true;

    // 2. Check for primaryActionButton prop with aria-label
    const opening = node.openingElement;
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
            if (hasAriaLabel) return true;
        }
    }
    return false;
}
