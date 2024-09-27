// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

var elementType = require("jsx-ast-utils").elementType;
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const { applicableComponents } = require("../applicableComponents/buttonBasedComponents");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible warning messages for the lint rule
        messages: {
            visualLabelSuggestion: `Visual label is better than an aria-label`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "Visual label is better than an aria-label",
            recommended: true,
            url: null // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a listed component, return
                if (!applicableComponents.includes(elementType(node))) {
                    return;
                }

                // if the element contains aria-label, show the warning message
                if (hasNonEmptyProp(node.attributes, "aria-label")) {
                    context.report({
                        node,
                        messageId: `visualLabelSuggestion`
                    });
                }
            }
        };
    }
};
