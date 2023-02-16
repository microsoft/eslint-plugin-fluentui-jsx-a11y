/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

const { getPropValue, getProp, hasProp, elementType } = require('jsx-ast-utils');
const { flattenChildren } = require('../util/flattenChildren');

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
            url: "https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/", // URL to the documentation page for this rule
        },
        messages: {
            missingAriaLabel: "Accessibility Rule: Image links must have an accessible name. Link can have a title attribute or text content, or Image can have an aria-label, aria-labelledby, or title attribute."
        },
        fixable: "code",
        schema: [], // Add a schema if the rule has options
    },

  create(context) {
    const hasNonEmptyProp = (attributes, name) => {
        return hasProp(attributes, name) && getPropValue(getProp(attributes, name)).trim().length > 0;
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
        // visitor functions for different types of nodes
        JSXOpeningElement(node) {
            if (elementType(node) === "Link") {
                const flatChildren = flattenChildren(node.parent);

                // Check if there is text content
                const hasTextContent = flatChildren.some(child => 
                    child.type === "JSXText"
                    ? child.value.trim().length > 0 
                    : false);
                
                if (hasTextContent) return;

                // Check if there is an accessible link
                const hasAccessibleLink = hasNonEmptyProp(node.attributes, "title");

                if (hasAccessibleLink) return;

                // Check if there is an accessible image
                const hasAccessibleImage = flatChildren.some(child => {
                    if (child.type === "JSXElement" && child.openingElement.name.name === "Image") {
                        return hasProp(child.openingElement.attributes, "aria-hidden")
                            ? false
                            : (hasNonEmptyProp(child.openingElement.attributes, "title")
                            || hasNonEmptyProp(child.openingElement.attributes, "aria-label")
                            || hasNonEmptyProp(child.openingElement.attributes, "aria-labelledby"));
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
  },
};
