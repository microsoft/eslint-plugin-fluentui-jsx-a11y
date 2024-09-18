// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        messages: {
            accordionItemOneHeaderOnePanel: "ensure AccordionItem has exactly one header and one panel"
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "An AccordionItem needs exactly one header and one panel",
            recommended: true,
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },
    create(context) {
        return {
            JSXOpeningElement(node) {
                if (node.name.name !== "AccordionItem") {
                    return;
                }
                const children = node.parent.children.filter(child => child.type === "JSXElement");
                const hasOneHeader = children.filter(child => child.openingElement.name.name === "AccordionHeader").length === 1;
                const hasOnePanel = children.filter(child => child.openingElement.name.name === "AccordionPanel").length === 1;
                if (!hasOneHeader || !hasOnePanel || children.length !== 2) {
                    context.report({
                        node,
                        messageId: "accordionItemOneHeaderOnePanel"
                    });
                }
            }
        };
    }
};
