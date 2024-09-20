// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasAssociatedAriaText } from "../util/labelUtils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaOnDialogSurface:
                "DialogueSurface need accessible labelling: aria-describedby on DialogueSurface and aria-label or aria-labelledby(if DialogueTitle is missing)"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description:
                "DialogueSurface need accessible labelling: aria-describedby on DialogueSurface and aria-label or aria-labelledby(if DialogueTitle is missing)",
            recommended: "strict",
            url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" // URL to the documentation page for this rule
        },
        schema: []
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a DialogSurface, return
                if (elementType(node as JSXOpeningElement) !== "DialogSurface") {
                    return;
                }

                // determine if DialogSurface as aria-describedby
                const hasAriaDescribedBy = hasAssociatedAriaText(node, context, "aria-describedby");

                // find DialogBody Component
                const dialogueSurfaceChildren =
                    node.parent &&
                    node.parent.type === AST_NODE_TYPES.JSXElement &&
                    node.parent.children.filter(child => child.type === "JSXElement");

                if (dialogueSurfaceChildren) {
                    const DialogBodyNode = dialogueSurfaceChildren.find(
                        child =>
                            child.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier &&
                            child.openingElement.name.name === "DialogBody"
                    );

                    // find DialogTitle inside DialogBody Component
                    const dialogueBodyChildren = DialogBodyNode && DialogBodyNode.children.filter(child => child.type === "JSXElement");

                    const DialogTitleNode =
                        dialogueBodyChildren &&
                        dialogueBodyChildren.find(
                            child =>
                                child.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier &&
                                child.openingElement.name.name === "DialogTitle"
                        );

                    // determine if DialogueText has any text content
                    const hasDialogTitleText = DialogTitleNode && hasTextContentChild(DialogTitleNode);

                    // determine if DialogueText or aria-label is present
                    const hasTitleOrAriaLabelledBy =
                        hasDialogTitleText ||
                        hasNonEmptyProp(node.attributes, "aria-label") ||
                        hasAssociatedAriaText(node, context, "aria-labelledby");

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

export default rule;
