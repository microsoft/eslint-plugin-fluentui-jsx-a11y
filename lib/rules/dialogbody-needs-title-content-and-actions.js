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
            dialogBodyOneTitleOneContentOneFooter: "ensure DialogBody has exactly one header,one content and one footer"
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "A DialogBody should have a header(DialogTitle), content(DialogContent), and footer(DialogActions)",
            recommended: true,
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            JSXOpeningElement(node) {
                if (node.name.name !== "DialogBody") {
                    return;
                }

                const children = node.parent.children.filter(child => child.type === "JSXElement");

                const hasOneTitle = children.filter(child => child.openingElement.name.name === "DialogTitle").length === 1;

                const hasOneContnet = children.filter(child => child.openingElement.name.name === "DialogContent").length === 1;

                const hasOneAction = children.filter(child => child.openingElement.name.name === "DialogActions").length === 1;

                if (!hasOneTitle || !hasOneContnet || !hasOneAction || children.length !== 3) {
                    context.report({
                        node,
                        messageId: "dialogBodyOneTitleOneContentOneFooter"
                    });
                }
            }
        };
    }
};
