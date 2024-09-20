// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabelOnToolbar: "Toolbars need accessible labelling: aria-label or aria-labelledby"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Toolbars need accessible labelling: aria-label or aria-labelledby",
            recommended: "strict",
            url: "https://www.w3.org/WAI/tutorials/forms/labels/" // URL to the documentation page for this rule
        },
        schema: []
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a Toolbar, return
                if (elementType(node as JSXOpeningElement) !== "Toolbar") {
                    return;
                }

                // if the Toolbar has aria labelling, return
                if (hasNonEmptyProp(node.attributes, "aria-label") || hasAssociatedLabelViaAriaLabelledBy(node, context)) {
                    return;
                }

                context.report({
                    node,
                    messageId: `missingLabelOnToolbar`
                });
            }
        };
    }
});

export default rule;
