// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

var elementType = require("jsx-ast-utils").elementType;
const { getProp } = require("jsx-ast-utils");
var hasProp = require("jsx-ast-utils").hasProp;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        messages: {
            counterBadgeNeedsCount: "CounterBadge: needs numerical count. Add numerical count.",
            counterBadgeIconNeedsLabelling: "The icon inside <CounterBadge> must have an aria-label attribute."
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "",
            recommended: false,
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role" // URL to the documentation page for this rule
        },
        fixable: "code", // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;

                if (elementType(openingElement) !== "CounterBadge") {
                    return;
                }

                const hasDot = hasProp(openingElement.attributes, "dot");

                if (hasDot) {
                    return;
                }

                const hasIconProp = hasProp(openingElement.attributes, "icon");

                if (hasIconProp) {
                    const iconProp = getProp(openingElement.attributes, "icon");

                    if (iconProp) {
                        const iconElement = iconProp.value.expression;

                        const ariaLabelAttr = hasProp(iconElement.openingElement.attributes, "aria-label");

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

                const hasCount = hasProp(openingElement.attributes, "count");

                if (hasCount) {
                    return;
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
};

