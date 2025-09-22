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
            missingDataGridLabelling:
                "Accessibility: DataGrid must have an accessible name via aria-label, aria-labelledby, or be wrapped in a Field component",
            suggestAriaRowCount: "Accessibility: Consider adding aria-rowcount for better screen reader experience with large datasets"
        },
        type: "problem",
        docs: {
            description: "Accessibility: DataGrid must have proper labelling and follow ARIA grid patterns for complex data tables",
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
        },
        schema: []
    },
    create(context) {
        return {
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a DataGrid, return
                if (elementType(node as JSXOpeningElement) !== "DataGrid") {
                    return;
                }

                // Check if DataGrid is wrapped in a Field component (provides labeling context)
                const hasFieldParentCheck = hasFieldParent(context);

                // Check for direct labeling methods
                const hasAriaLabel = hasNonEmptyProp(node.attributes, "aria-label");
                const hasAriaLabelledBy = hasAssociatedLabelViaAriaLabelledBy(node, context);

                // DataGrid accessibility requirements:
                // 1. Must have accessible name (Field parent, aria-label, or aria-labelledby)
                const hasAccessibleName = hasFieldParentCheck || hasAriaLabel || hasAriaLabelledBy;

                if (!hasAccessibleName) {
                    context.report({
                        node,
                        messageId: "missingDataGridLabelling"
                    });
                }

                // Optional: Check for ARIA best practices
                const hasRowCount = hasNonEmptyProp(node.attributes, "aria-rowcount");
                const hasItems = hasNonEmptyProp(node.attributes, "items");

                // If DataGrid has items but no aria-rowcount, suggest it for better UX
                // (This would be a warning-level rule in practice)
                if (hasItems && !hasRowCount && hasAccessibleName) {
                    // Could add a suggestion here for aria-rowcount
                    // context.report({ node, messageId: "suggestAriaRowCount" });
                }
            }
        };
    }
});

export default rule;
