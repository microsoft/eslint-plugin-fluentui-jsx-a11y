// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/types";
import { elementType, hasProp } from "jsx-ast-utils";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasToolTipParent } from "../util/hasTooltipParent";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { JSXAttribute, JSXOpeningElement, Literal } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const applicableComponents = ["Button"];

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            preferAria: `Prefer aria over the title attribute for accessible labelling: ${applicableComponents.join(", ")}`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                "The title attribute is not consistently read by screen readers, and its behavior can vary depending on the screen reader and the user's settings.",
            recommended: "warn"
        },
        fixable: "code", // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;
                // if it is not a listed component, return
                if (!applicableComponents.includes(elementType(openingElement as JSXOpeningElement))) {
                    return;
                }
                // if it is not an icon button, return
                if (!hasProp(openingElement.attributes as JSXAttribute[], "icon")) {
                    return;
                }

                // if it has a tooltip parent, return
                if (hasToolTipParent(context)) {
                    return;
                }

                // if it has text content, return
                if (hasTextContentChild(node)) {
                    return;
                }

                // the button has an associated label
                if (hasAssociatedLabelViaAriaLabelledBy(openingElement, context)) {
                    return;
                }

                const hasAria = hasNonEmptyProp(openingElement.attributes, "aria-label");
                const hasTitle = hasNonEmptyProp(openingElement.attributes, "title");

                // if it has no accessible name, report error
                if (hasTitle && !hasAria) {
                    context.report({
                        node,
                        messageId: `preferAria`,
                        fix(fixer) {
                            const attributes = openingElement.attributes;
                            const titleAttribute = attributes.find(
                                attr => attr.type === AST_NODE_TYPES.JSXAttribute && attr.name && attr.name.name === "title"
                            );
                            // Generate the aria-label attribute
                            const ariaLabel = ` aria-label="${
                                titleAttribute && titleAttribute.type === AST_NODE_TYPES.JSXAttribute && titleAttribute.value
                                    ? (titleAttribute.value as Literal).value
                                    : ""
                            }"`;

                            // Find the location to insert the new attribute
                            const lastAttribute = attributes[attributes.length - 1];
                            const insertPosition = lastAttribute.range[1];

                            return fixer.insertTextAfterRange([insertPosition, insertPosition], ariaLabel);
                        }
                    });
                }
            }
        };
    }
});

export default rule;
