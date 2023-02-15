/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

const { getPropValue, getProp, hasProp, elementType } = require('jsx-ast-utils');

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
    const hasNonEmptyProp = (attributes, name ) => {
        return hasProp(attributes, name) && getPropValue(getProp(attributes, name)).trim().length > 0;
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
        // visitor functions for different types of nodes
        JSXOpeningElement(node) {
            if (elementType(node) === "Link") {
                const hasTextContent = node.parent.children.some(child => 
                    child.type === "JSXText" 
                    ? child.value.trim().length > 0 
                    : false);                

                const hasAccessibleLink = hasNonEmptyProp(node.attributes, "title") || hasTextContent;

                const hasAccessibleImage = node.parent.children.some(child => {
                    if (child.type === "JSXElement" && child.openingElement.name.name === "Image") {
                        return hasNonEmptyProp(child.openingElement.attributes, "title")
                            || hasNonEmptyProp(child.openingElement.attributes, "aria-label")
                            || hasNonEmptyProp(child.openingElement.attributes, "aria-labelledby");
                    }
                    return false;
                });

                // Report if there is no accessible link or image
                if (!hasAccessibleLink && !hasAccessibleImage) {
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
