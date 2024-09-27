"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            accordionItemOneHeaderOnePanel: "ensure AccordionItem has exactly one header and one panel"
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "An AccordionItem needs exactly one header and one panel",
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" // URL to the documentation page for this rule
        },
        schema: [] // Add a schema if the rule has options
    },
    create(context) {
        return {
            JSXOpeningElement(node) {
                if (node.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier && node.name.name !== "AccordionItem") {
                    return;
                }
                if (!(node.parent && node.parent.type === utils_1.AST_NODE_TYPES.JSXElement)) {
                    return;
                }
                const children = node.parent.children.filter(child => child.type === "JSXElement");
                const hasOneHeader = children.filter(child => child.openingElement.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier &&
                    child.openingElement.name.name === "AccordionHeader").length === 1;
                const hasOnePanel = children.filter(child => child.openingElement.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier &&
                    child.openingElement.name.name === "AccordionPanel").length === 1;
                if (!hasOneHeader || !hasOnePanel || children.length !== 2) {
                    context.report({
                        node,
                        messageId: "accordionItemOneHeaderOnePanel"
                    });
                }
            }
        };
    }
});
exports.default = rule;
