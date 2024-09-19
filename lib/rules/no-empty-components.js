// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

var elementType = require("jsx-ast-utils").elementType;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
// Define an array of allowed component names
const allowedComponents = ["Text", "Label", "Combobox", "Breadcrumb", "Dropdown", "Accordion", "AccordionItem", "AccordionPanel"];

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible error messages for the lint rule
        messages: {
            noEmptyComponents: `Accessibility: no empty ${allowedComponents.join(", ")} components`
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "FluentUI components should not be empty",
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
            JSXElement(node) {
                const openingElement = node.openingElement;

                // if it is not a listed component, return
                if (!allowedComponents.includes(elementType(openingElement))) {
                    return;
                }

                const hasChildren = node.children.length > 0;

                // if there are no children, report error
                if (!hasChildren) {
                    context.report({
                        node,
                        messageId: `noEmptyComponents`
                    });
                }
            }
        };
    }
};
