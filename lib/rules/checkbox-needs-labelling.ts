// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { elementType } from "jsx-ast-utils";
import { hasAssociatedLabelViaAriaLabelledBy, isInsideLabelTag, hasAssociatedLabelViaHtmlFor } from "../util/labelUtils";
import { hasFieldParent } from "../util/hasFieldParent";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledCheckbox: "Accessibility: Checkbox without label must have an accessible and visual label: aria-labelledby"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            // DONE
            description: "Accessibility: Checkbox without label must have an accessible and visual label: aria-labelledby",
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
                // if it is not a Checkbox, return
                if (elementType(node as JSXOpeningElement) !== "Checkbox") {
                    return;
                }

                // if the Checkbox has a label, if the Switch has an associated label, return
                if (
                    hasNonEmptyProp(node.attributes, "label") ||
                    hasFieldParent(context) ||
                    isInsideLabelTag(context) ||
                    hasAssociatedLabelViaHtmlFor(node, context) ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context)
                ) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledCheckbox`
                });
            }
        };
    }
});

export default rule;
