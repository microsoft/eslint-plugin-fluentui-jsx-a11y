// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'This rule aims to ensure that Tabs with icons but no text labels have an accessible name and that Tablist is properly labeled.',
            recommended: true,
            url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/', // URL to the documentation page for this rule
        },
        fixable: null,
        schema: [],
        messages: {
            missingTabLabel: 'Accessibility: Tab elements must have an aria-label attribute is there is no visiable text content',
            missingTablistLabel: 'Accessibility: Tablist must have an accessible label'
        },
    },

  create(context) {
    const { hasTextContentChild } = require('../util/hasTextContentChild');
    const { hasNonEmptyProp } = require('../util/hasNonEmptyProp');
    const { hasAssociatedLabelViaAriaLabelledBy } = require('../util/labelUtils');

    var elementType = require("jsx-ast-utils").elementType;

    return {
            
      // visitor functions for different types of nodes
        JSXOpeningElement(node) {
            const elementTypeValue = elementType(node);

            // if it is not a Tablist or Tab, return
            if (elementTypeValue !== 'Tablist' && elementTypeValue !== 'Tab') {
                return;
            }

            // Check for Tablist elements
            if (elementTypeValue === "Tablist") {
                if (
                    // if the Tablist has a label, if the Tablist has an associated label, return
                    hasNonEmptyProp(node.attributes, 'aria-label') || //aria-label
                    hasAssociatedLabelViaAriaLabelledBy(node, context) // aria-labelledby
                ) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'missingTablistLabel'
                });
            }

            // Check for Tab elements
            if (elementTypeValue === 'Tab') {
                if (
                    hasTextContentChild(node.parent) || // text content
                    hasNonEmptyProp(node.attributes, 'aria-label') // aria-label
                ) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'missingTabLabel'
                });
            }
        }
    };
  },
};
