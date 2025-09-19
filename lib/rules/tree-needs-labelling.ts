// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { hasFieldParent } from "../util/hasFieldParent";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            missingTreeLabelling:
                "Accessibility: Tree must have an accessible name via aria-label, aria-labelledby, or Field wrapper to describe the tree's purpose",
            missingTreeItems: "Accessibility: Tree should contain TreeItem elements for proper hierarchical structure"
        },
        type: "problem",
        docs: {
            description: "Accessibility: Tree must have proper labelling and follow ARIA tree pattern for hierarchical navigation",
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/treeview/"
        },
        schema: []
    },
    create(context) {
        return {
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it is not a Tree, return
                if (elementType(openingElement as JSXOpeningElement) !== "Tree") {
                    return;
                }

                // Check if this Tree is nested inside another Tree structure
                const isNestedTree = context.getAncestors().some(ancestor => {
                    if (ancestor.type === "JSXElement") {
                        const ancestorElementType = elementType(ancestor.openingElement as JSXOpeningElement);
                        return ancestorElementType === "Tree" || ancestorElementType === "TreeItem";
                    }
                    return false;
                });

                // Check if Tree is wrapped in a Field component
                const hasFieldParentCheck = hasFieldParent(context);

                // Check for ARIA labeling
                const hasAriaLabel = hasNonEmptyProp(openingElement.attributes, "aria-label");
                const hasAriaLabelledBy = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);

                // Tree accessibility requirements
                const hasAccessibleName = hasFieldParentCheck || hasAriaLabel || hasAriaLabelledBy;

                // Only require labeling for top-level trees (not nested ones)
                if (!hasAccessibleName && !isNestedTree) {
                    context.report({
                        node: openingElement,
                        messageId: "missingTreeLabelling"
                    });
                }

                // Optional: Check for TreeItem children (proper tree structure)
                const hasTreeItems = node.children.some(
                    child => child.type === "JSXElement" && elementType(child.openingElement as JSXOpeningElement) === "TreeItem"
                );

                // Trees should contain TreeItems for proper navigation
                if (hasAccessibleName && !hasTreeItems && node.children.length > 0) {
                    // context.report({ node: openingElement, messageId: "missingTreeItems" });
                }
            }
        };
    }
});

export default rule;
