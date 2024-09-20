"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
// Define an array of allowed component names
const allowedComponents = ["Text", "Label", "Combobox", "Breadcrumb", "Dropdown", "Accordion", "AccordionItem", "AccordionPanel"];
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the lint rule
        messages: {
            noEmptyComponents: `Accessibility: no empty ${allowedComponents.join(", ")} components`
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "FluentUI components should not be empty",
            recommended: "strict"
        },
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a listed component, return
                if (!allowedComponents.includes((0, jsx_ast_utils_1.elementType)(openingElement))) {
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
});
exports.default = rule;
