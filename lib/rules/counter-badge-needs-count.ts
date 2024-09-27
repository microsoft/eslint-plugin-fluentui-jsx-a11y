// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { getProp, elementType, hasProp } from "jsx-ast-utils";
import { JSXAttribute, JSXOpeningElement } from "estree-jsx";

import { hasTextContentChild } from "../util/hasTextContentChild";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            counterBadgeNeedsCount: "CounterBadge: needs numerical count. Add numerical count.",
            counterBadgeIconNeedsLabelling: "The icon inside <CounterBadge> must have an aria-label attribute."
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "",
            recommended: false,
            url: "" // URL to the documentation page for this rule
        },
        fixable: "code", // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement as JSXOpeningElement;

                if (elementType(openingElement) !== "CounterBadge") {
                    return;
                }

                const hasCount = hasProp(openingElement.attributes, "count");
                if (hasCount) {
                    return;
                }

                const hasTextContent = hasTextContentChild(node);
                if (hasTextContent) {
                    return;
                }

                const hasDot = hasProp(openingElement.attributes, "dot");
                if (hasDot) {
                    return;
                }

                const hasIconProp = hasProp(openingElement.attributes, "icon");
                if (hasIconProp) {
                    const iconProp = getProp(openingElement.attributes, "icon") as TSESTree.JSXAttribute;

                    if (iconProp && iconProp.value && iconProp.value.type === AST_NODE_TYPES.JSXExpressionContainer) {
                        const iconElement = iconProp.value.expression as TSESTree.JSXElement;

                        const ariaLabelAttr = hasProp(iconElement.openingElement.attributes as JSXAttribute[], "aria-label");

                        if (!ariaLabelAttr) {
                            context.report({
                                node,
                                messageId: "counterBadgeIconNeedsLabelling",
                                fix(fixer) {
                                    const ariaLabelFix = fixer.insertTextAfter(iconElement.openingElement.name, ' aria-label=""');
                                    return ariaLabelFix;
                                }
                            });
                        }
                    }
                }

                context.report({
                    node,
                    messageId: "counterBadgeNeedsCount",
                    fix(fixer) {
                        const countFix = fixer.insertTextAfter((openingElement as TSESTree.JSXOpeningElement).name, " count={0}");
                        return countFix;
                    }
                });
            }
        };
    }
});

export default rule;

