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
            dialogBodyOneTitleOneContentOneFooter: "ensure DialogBody has exactly one header,one content and one footer"
        },
        type: "problem", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "A DialogBody should have a header(DialogTitle), content(DialogContent), and footer(DialogActions)",
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" // URL to the documentation page for this rule
        },
        schema: [] // Add a schema if the rule has options
    },
    create(context) {
        return {
            JSXOpeningElement(node) {
                if (node.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier && node.name.name !== "DialogBody") {
                    return;
                }
                const children = node.parent &&
                    node.parent.type === utils_1.AST_NODE_TYPES.JSXElement &&
                    node.parent.children.filter(child => child.type === "JSXElement");
                if (children) {
                    const hasOneTitle = children.filter(child => child.openingElement.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier &&
                        child.openingElement.name.name === "DialogTitle").length === 1;
                    const hasOneContnet = children.filter(child => child.openingElement.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier &&
                        child.openingElement.name.name === "DialogContent").length === 1;
                    const hasOneAction = children.filter(child => child.openingElement.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier &&
                        child.openingElement.name.name === "DialogActions").length === 1;
                    if (!hasOneTitle || !hasOneContnet || !hasOneAction || children.length !== 3) {
                        context.report({
                            node,
                            messageId: "dialogBodyOneTitleOneContentOneFooter"
                        });
                    }
                }
            }
        };
    }
});
exports.default = rule;
