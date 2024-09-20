"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const jsx_ast_utils_2 = require("jsx-ast-utils");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            badgeNeedsAccessibleName: "Badge: needs accessible name. Add text content or a labelled image.",
            colourOnlyBadgesNeedAttributes: 'Color-only <Badge> must have role="img" and an aria-label attribute.',
            badgeIconNeedsLabelling: "The icon inside <Badge> must have an aria-label attribute."
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
                // If it's not a Badge component, return early
                if ((0, jsx_ast_utils_1.elementType)(openingElement) !== "Badge") {
                    return;
                }
                const hasTextContent = (0, hasTextContentChild_1.hasTextContentChild)(node);
                // Check if Badge has text content and return early if it does
                if (hasTextContent) {
                    return;
                }
                // Check if Badge has an icon
                const hasIconProp = (0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "icon");
                if (hasIconProp) {
                    const iconProp = (0, jsx_ast_utils_2.getProp)(openingElement.attributes, "icon");
                    if (iconProp && iconProp.value && iconProp.value.type === utils_1.AST_NODE_TYPES.JSXExpressionContainer) {
                        const iconElement = iconProp.value.expression;
                        // Check if the icon has an aria-label
                        const ariaLabelAttr = (0, jsx_ast_utils_1.hasProp)(iconElement.openingElement.attributes, "aria-label");
                        // Report an error if aria-label is missing
                        if (!ariaLabelAttr) {
                            context.report({
                                node,
                                messageId: "badgeIconNeedsLabelling",
                                fix(fixer) {
                                    const ariaLabelFix = fixer.insertTextAfter(iconElement.openingElement.name, ' aria-label=""');
                                    return ariaLabelFix;
                                }
                            });
                        }
                    }
                }
                // Simplified logic to check for a color-only Badge (no icon, no text)
                const roleProp = (0, jsx_ast_utils_2.getProp)(openingElement.attributes, "role");
                const hasColorProp = (0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "color");
                const hasRole = !!roleProp && (0, jsx_ast_utils_2.getPropValue)(roleProp) === "img";
                const hasAriaLabel = (0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "aria-label");
                // If it's color-only, ensure it has role="img" and aria-label
                if (!hasIconProp && !(hasRole && hasAriaLabel)) {
                    if (hasColorProp) {
                        context.report({
                            node,
                            messageId: "colourOnlyBadgesNeedAttributes",
                            fix(fixer) {
                                const fixes = [];
                                // Fix role by adding role="img"
                                if (!hasRole) {
                                    fixes.push(fixer.insertTextAfter(openingElement.name, ' role="img"'));
                                }
                                // Fix aria-label by adding aria-label=""
                                if (!hasAriaLabel) {
                                    fixes.push(fixer.insertTextAfter(openingElement.name, ' aria-label=""'));
                                }
                                return fixes;
                            }
                        });
                    }
                    else {
                        context.report({
                            node,
                            messageId: "badgeNeedsAccessibleName"
                        });
                    }
                }
            }
        };
    }
});
exports.default = rule;
