// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../../util/hasNonEmptyProp";
import { hasToolTipParent } from "../../util/hasTooltipParent";
import { hasTextContentChild } from "../../util/hasTextContentChild";
import { hasAssociatedLabelViaAriaLabelledBy } from "../../util/labelUtils";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: "Accessibility: Compound buttons must have an accessible name"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description:
                "Accessibility: Compound buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it is not a Compound button, return
                if (elementType(openingElement as JSXOpeningElement) !== "CompoundButton") {
                    return;
                }

                // if it has a tooltip parent Or has text content Or has an associated label or has secondaryContent, return
                if (
                    hasToolTipParent(context) ||
                    hasTextContentChild(node) ||
                    hasAssociatedLabelViaAriaLabelledBy(openingElement, context) ||
                    hasNonEmptyProp(openingElement.attributes, "secondaryContent")
                ) {
                    return;
                }

                const hasAccessibleLabelling =
                    hasNonEmptyProp(openingElement.attributes, "title") || hasNonEmptyProp(openingElement.attributes, "aria-label");

                // if it has no accessible name, report error
                if (!hasAccessibleLabelling) {
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
