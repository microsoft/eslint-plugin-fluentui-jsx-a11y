// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import { JSXAttribute, JSXOpeningElement, Literal } from "estree-jsx";
import { elementType, hasProp } from "jsx-ast-utils";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasToolTipParent } from "../util/hasTooltipParent";
import { hasTextContentChild } from "../util/hasTextContentChild";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const applicableComponents = ["Button"];

const rule: Rule.RuleModule = {
    meta: {
        // possible error messages for the rule
        messages: {
            preferAria: `Prefer aria over the title attribute for accessible labelling: ${applicableComponents.join(", ")}`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                "The title attribute is not consistently read by screen readers, and its behavior can vary depending on the screen reader and the user's settings.",
            recommended: true
        },
        fixable: "code", // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: any) {
                const openingElement = node.openingElement as JSXOpeningElement;
                // if it is not a listed component, return
                if (!applicableComponents.includes(elementType(openingElement))) {
                    return;
                }
                // if it is not an icon button, return
                if (!hasProp(openingElement.attributes, "icon")) {
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
                                attr => (attr as JSXAttribute).name && (attr as JSXAttribute).name.name === "title"
                            ) as JSXAttribute;
                            // Generate the aria-label attribute
                            const ariaLabel =
                                titleAttribute && titleAttribute.value && ` aria-label="${(titleAttribute.value as Literal).value}"`;

                            // Find the location to insert the new attribute
                            const lastAttribute = attributes[attributes.length - 1];
                            const insertPosition = lastAttribute.range?.[1];
                            if (insertPosition) {
                                return fixer.insertTextAfterRange([insertPosition, insertPosition], ariaLabel ?? "");
                            }
                            return null;
                        }
                    });
                }
            }
        };
    }
};

export default rule;
