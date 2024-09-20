// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
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
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                if (node.name.type === AST_NODE_TYPES.JSXIdentifier && node.name.name !== "AccordionItem") {
                    return;
                }

                if (!(node.parent && node.parent.type === AST_NODE_TYPES.JSXElement)) {
                    return;
                }

                const children = node.parent.children.filter(child => child.type === "JSXElement");

                const hasOneHeader =
                    children.filter(
                        child =>
                            child.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier &&
                            child.openingElement.name.name === "AccordionHeader"
                    ).length === 1;

                const hasOnePanel =
                    children.filter(
                        child =>
                            child.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier &&
                            child.openingElement.name.name === "AccordionPanel"
                    ).length === 1;

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

export default rule;
