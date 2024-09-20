// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { hasToolTipParent } from "../util/hasTooltipParent";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledMenuItem: "Accessibility: MenuItem must have an accessible label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        docs: {
            description: "Accessibility: MenuItem without label must have an accessible and visual label: aria-labelledby",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;
                // if it is not a MenuItem, return
                if (elementType(openingElement as JSXOpeningElement) !== "MenuItem") {
                    return;
                }

                // if the MenuItem has a text, label or an associated label, return
                if (
                    hasNonEmptyProp(openingElement.attributes, "aria-label") || //aria-label, not recommended but will work for screen reader users
                    hasAssociatedLabelViaAriaLabelledBy(openingElement, context) || // aria-labelledby
                    hasTextContentChild(node) || // has text content
                    hasToolTipParent(context) // has tooltip parent, not recommended but will work for screen reader users
                ) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledMenuItem`
                });
            }
        };
    }
});

export default rule;
