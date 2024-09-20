// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasToolTipParent } from "../util/hasTooltipParent";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible suggestion messages for the rule
        messages: {
            unRecommendedlabellingSpinButton: "Accessibility: Unrecommended accessibility labelling - SpinButton"
        },
        // "problem" means the rule is identifying something that could be done in a better way but no errors will occur if the code isn’t changed: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "suggestion",
        // docs for the rule
        docs: {
            description: "Accessibility: Unrecommended accessibility labelling - SpinButton",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a SpinButton, return
                if (elementType(node as JSXOpeningElement) !== "SpinButton") {
                    return;
                }

                // if the SpinButton has an aria-label or is wrapped in a Tooltip, show warning
                if (hasNonEmptyProp(node.attributes, "aria-label") || hasToolTipParent(context)) {
                    context.report({
                        node,
                        messageId: `unRecommendedlabellingSpinButton`
                    });
                }
            }
        };
    }
});

export default rule;
