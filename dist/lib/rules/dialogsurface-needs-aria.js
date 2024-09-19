// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
const { hasAssociatedAriaText } = require("../util/labelUtils");
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const { hasTextContentChild } = require("../util/hasTextContentChild");
var elementType = require("jsx-ast-utils").elementType;
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaOnDialogSurface: "DialogueSurface need accessible labelling: aria-describedby on DialogueSurface and aria-label or aria-labelledby(if DialogueTitle is missing)"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "DialogueSurface need accessible labelling: aria-describedby on DialogueSurface and aria-label or aria-labelledby(if DialogueTitle is missing)",
            recommended: true,
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" // URL to the documentation page for this rule
        },
        schema: []
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a DialogSurface, return
                if (elementType(node) !== "DialogSurface") {
                    return;
                }
                // determine if DialogSurface as aria-describedby
                const hasAriaDescribedBy = hasAssociatedAriaText(node, context, "aria-describedby");
                // find DialogBody Component
                const dialogueSurfaceChildren = node.parent.children.filter(child => child.type === "JSXElement");
                const DialogBodyNode = dialogueSurfaceChildren.find(child => child.openingElement.name.name === "DialogBody");
                // find DialogTitle inside DialogBody Component
                const dialogueBodyChildren = DialogBodyNode && DialogBodyNode.children.filter(child => child.type === "JSXElement");
                const DialogTitleNode = dialogueBodyChildren && dialogueBodyChildren.find(child => child.openingElement.name.name === "DialogTitle");
                // determine if DialogueText has any text content
                const hasDialogTitleText = DialogTitleNode && hasTextContentChild(DialogTitleNode);
                // determine if DialogueText or aria-label is present
                const hasTitleOrAriaLabelledBy = hasDialogTitleText || hasNonEmptyProp(node.attributes, "aria-label") || hasAssociatedAriaText(node, context, "aria-labelledby");
                // if the DialogSurface has aria labelling and description, return
                if (hasAriaDescribedBy && hasTitleOrAriaLabelledBy) {
                    return;
                }
                context.report({
                    node,
                    messageId: `missingAriaOnDialogSurface`
                });
            }
        };
    }
};
