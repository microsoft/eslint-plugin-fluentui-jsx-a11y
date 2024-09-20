// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType, hasProp } from "jsx-ast-utils";
import { getPropValue, getProp } from "jsx-ast-utils";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { JSXAttribute, JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
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
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement as JSXOpeningElement;

                // If it's not a Badge component, return early
                if (elementType(openingElement) !== "Badge") {
                    return;
                }

                const hasTextContent = hasTextContentChild(node);

                // Check if Badge has text content and return early if it does
                if (hasTextContent) {
                    return;
                }

                // Check if Badge has an icon
                const hasIconProp = hasProp(openingElement.attributes, "icon");

                if (hasIconProp) {
                    const iconProp = getProp(openingElement.attributes, "icon") as TSESTree.JSXAttribute;

                    if (iconProp && iconProp.value && iconProp.value.type === AST_NODE_TYPES.JSXExpressionContainer) {
                        const iconElement = iconProp.value.expression as TSESTree.JSXElement;

                        // Check if the icon has an aria-label
                        const ariaLabelAttr = hasProp(iconElement.openingElement.attributes as JSXAttribute[], "aria-label");

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
                const roleProp = getProp(openingElement.attributes, "role");
                const hasColorProp = hasProp(openingElement.attributes, "color");
                const hasRole = !!roleProp && getPropValue(roleProp) === "img";
                const hasAriaLabel = hasProp(openingElement.attributes, "aria-label");

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
                                    fixes.push(fixer.insertTextAfter((openingElement as TSESTree.JSXOpeningElement).name, ' role="img"'));
                                }

                                // Fix aria-label by adding aria-label=""
                                if (!hasAriaLabel) {
                                    fixes.push(
                                        fixer.insertTextAfter((openingElement as TSESTree.JSXOpeningElement).name, ' aria-label=""')
                                    );
                                }

                                return fixes;
                            }
                        });
                    } else {
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

export default rule;
