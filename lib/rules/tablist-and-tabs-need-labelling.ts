// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { elementType } from "jsx-ast-utils";
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
                "This rule aims to ensure that Tabs with icons but no text labels have an accessible name and that Tablist is properly labeled.",
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" // URL to the documentation page for this rule
        },
        fixable: undefined,
        schema: [],
        messages: {
            missingTabLabel: "Accessibility: Tab elements must have an aria-label attribute is there is no visiable text content",
            missingTablistLabel: "Accessibility: Tablist must have an accessible label"
        }
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                const elementTypeValue = elementType(node as unknown as JSXOpeningElement);

                // if it is not a Tablist or Tab, return
                if (elementTypeValue !== "Tablist" && elementTypeValue !== "Tab") {
                    return;
                }

                // Check for Tablist elements
                if (elementTypeValue === "Tablist") {
                    if (
                        // if the Tablist has a label, if the Tablist has an associated label, return
                        hasNonEmptyProp(node.attributes, "aria-label") || //aria-label
                        hasAssociatedLabelViaAriaLabelledBy(node, context) // aria-labelledby
                    ) {
                        return;
                    }
                    context.report({
                        node,
                        messageId: "missingTablistLabel"
                    });
                }

                // Check for Tab elements
                if (elementTypeValue === "Tab") {
                    if (
                        hasTextContentChild(node.parent as unknown as TSESTree.JSXElement) || // text content
                        hasNonEmptyProp(node.attributes, "aria-label") // aria-label
                    ) {
                        return;
                    }
                    context.report({
                        node,
                        messageId: "missingTabLabel"
                    });
                }
            }
        };
    }
});

export default rule;
