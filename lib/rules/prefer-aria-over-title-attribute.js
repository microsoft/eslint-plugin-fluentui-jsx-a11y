// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { elementType } = require("jsx-ast-utils");
const { hasAssociatedLabelViaAriaLabelledBy } = require("../util/labelUtils");
var hasProp = require("jsx-ast-utils").hasProp;
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const { hasToolTipParent } = require("../util/hasTooltipParent");
const { hasTextContentChild } = require("../util/hasTextContentChild");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const applicableComponents = ["Button"];

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            preferAria: `Prefer aria over the title attribute for accessible labelling: ${applicableComponents.join(", ")}`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                "The title attribute is not consistently read by screen readers, and its behavior can vary depending on the screen reader and the user's settings.",
            recommended: true,
            url: null // URL to the documentation page for this rule
        },
        fixable: "code", // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
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
                            const titleAttribute = attributes.find(attr => attr.name && attr.name.name === "title");
                            // Generate the aria-label attribute
                            const ariaLabel = ` aria-label="${titleAttribute.value.value}"`;

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
};

