// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasProp, elementType } = require("jsx-ast-utils");
const { flattenChildren } = require("../util/flattenChildren");
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Accessibility: Image links must have an accessible name",
            recommended: true,
            url: "https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/" // URL to the documentation page for this rule
        },
        messages: {
            missingAriaLabel:
                "Accessibility Rule: Image links must have an accessible name. Link can have a title attribute or text content, or Image can have an aria-label, aria-labelledby, or title attribute."
        },
        fixable: "code",
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                if (elementType(node) === "Link") {
                    const flatChildren = flattenChildren(node.parent);

                    // Check if there is text content
                    const hasTextContent = flatChildren.some(child => (child.type === "JSXText" ? child.value.trim().length > 0 : false));

                    if (hasTextContent) return;

                    // Check if there is an accessible link
                    const hasAccessibleLink =
                        hasNonEmptyProp(node.attributes, "title") ||
                        hasNonEmptyProp(node.attributes, "aria-label") ||
                        hasNonEmptyProp(node.attributes, "aria-labelledby");

                    if (hasAccessibleLink) return;

                    // Check if there is an accessible image
                    const hasAccessibleImage = flatChildren.some(child => {
                        if (child.type === "JSXElement" && child.openingElement.name.name === "Image") {
                            return hasProp(child.openingElement.attributes, "aria-hidden")
                                ? false
                                : hasNonEmptyProp(child.openingElement.attributes, "title") ||
                                      hasNonEmptyProp(child.openingElement.attributes, "aria-label") ||
                                      hasNonEmptyProp(child.openingElement.attributes, "aria-labelledby");
                        }
                        return false;
                    });

                    if (hasAccessibleImage) return;

                    // Report if there is no text content, accessible link or image
                    if (!hasTextContent && !hasAccessibleLink && !hasAccessibleImage) {
                        context.report({
                            node,
                            messageId: `missingAriaLabel`
                        });
                    }
                }
            }
        };
    }
};
