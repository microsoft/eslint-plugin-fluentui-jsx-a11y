"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
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
            JSXElement(node) {
                const openingElement = node.openingElement;
                if ((0, jsx_ast_utils_1.elementType)(openingElement) !== "CounterBadge") {
                    return;
                }
                const hasCount = (0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "count");
                if (hasCount) {
                    return;
                }
                const hasTextContent = (0, hasTextContentChild_1.hasTextContentChild)(node);
                if (hasTextContent) {
                    return;
                }
                const hasDot = (0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "dot");
                if (hasDot) {
                    return;
                }
                const hasIconProp = (0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "icon");
                if (hasIconProp) {
                    const iconProp = (0, jsx_ast_utils_1.getProp)(openingElement.attributes, "icon");
                    if (iconProp && iconProp.value && iconProp.value.type === utils_1.AST_NODE_TYPES.JSXExpressionContainer) {
                        const iconElement = iconProp.value.expression;
                        const ariaLabelAttr = (0, jsx_ast_utils_1.hasProp)(iconElement.openingElement.attributes, "aria-label");
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
                        const countFix = fixer.insertTextAfter(openingElement.name, " count={0}");
                        return countFix;
                    }
                });
            }
        };
    }
});
exports.default = rule;
