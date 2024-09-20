// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType, hasProp } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasToolTipParent } from "../util/hasTooltipParent";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { JSXAttribute, JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            missingAriaLabel: "Accessibility: the accordion header must have an accessible name"
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                "The accordion header is a button and it needs an accessibile name e.g. text content, aria-label, aria-labelledby.",
            recommended: false
        },
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it is not a AccordionHeader, return
                if (elementType(openingElement as JSXOpeningElement) !== "AccordionHeader") {
                    return;
                }

                // if it has text content, return
                if (hasTextContentChild(node)) {
                    return;
                }

                // if it is not an icon button, return
                if (
                    !hasProp(openingElement.attributes as JSXAttribute[], "icon") &&
                    !hasProp(openingElement.attributes as JSXAttribute[], "expandIcon")
                ) {
                    return;
                }

                // if it has a tooltip parent, return
                if (hasToolTipParent(context)) {
                    return;
                }

                // the button has an associated label
                if (hasAssociatedLabelViaAriaLabelledBy(openingElement, context)) {
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
