"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const labelUtils_1 = require("../util/labelUtils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
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
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" // URL to the documentation page for this rule
        },
        schema: []
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a DialogSurface, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "DialogSurface") {
                    return;
                }
                // determine if DialogSurface as aria-describedby
                const hasAriaDescribedBy = (0, labelUtils_1.hasAssociatedAriaText)(node, context, "aria-describedby");
                // find DialogBody Component
                const dialogueSurfaceChildren = node.parent &&
                    node.parent.type === utils_1.AST_NODE_TYPES.JSXElement &&
                    node.parent.children.filter(child => child.type === "JSXElement");
                if (dialogueSurfaceChildren) {
                    const DialogBodyNode = dialogueSurfaceChildren.find(child => child.openingElement.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier &&
                        child.openingElement.name.name === "DialogBody");
                    // find DialogTitle inside DialogBody Component
                    const dialogueBodyChildren = DialogBodyNode && DialogBodyNode.children.filter(child => child.type === "JSXElement");
                    const DialogTitleNode = dialogueBodyChildren &&
                        dialogueBodyChildren.find(child => child.openingElement.name.type === utils_1.AST_NODE_TYPES.JSXIdentifier &&
                            child.openingElement.name.name === "DialogTitle");
                    // determine if DialogueText has any text content
                    const hasDialogTitleText = DialogTitleNode && (0, hasTextContentChild_1.hasTextContentChild)(DialogTitleNode);
                    // determine if DialogueText or aria-label is present
                    const hasTitleOrAriaLabelledBy = hasDialogTitleText ||
                        (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") ||
                        (0, labelUtils_1.hasAssociatedAriaText)(node, context, "aria-labelledby");
                    // if the DialogSurface has aria labelling and description, return
                    if (hasAriaDescribedBy && hasTitleOrAriaLabelledBy) {
                        return;
                    }
                    context.report({
                        node,
                        messageId: `missingAriaOnDialogSurface`
                    });
                }
            }
        };
    }
});
exports.default = rule;
