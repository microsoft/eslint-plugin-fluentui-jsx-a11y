// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { isInsideLabelTag, hasAssociatedLabelViaHtmlFor, hasAssociatedLabelViaAriaLabelledBy, hasAriaLabel } from "../util/labelUtils";
import { hasFieldParent } from "../util/hasFieldParent";
import { applicableComponents } from "../applicableComponents/inputBasedComponents";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabelOnInput: `Accessibility - input fields must have a aria label associated with it: ${applicableComponents.join(
                ", "
            )}`
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Input fields must have accessible labelling: aria-label, aria-labelledby or an associated label",
            recommended: "strict",
            url: "https://www.w3.org/WAI/tutorials/forms/labels/" // URL to the documentation page for this rule
        },
        schema: []
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a listed component, return
                if (!applicableComponents.includes(elementType(node as JSXOpeningElement))) {
                    return;
                }

                // wrapped in Label tag, labelled with htmlFor, labelled with aria-labelledby, labelled with aria-label
                if (
                    hasAriaLabel(node) ||
                    hasFieldParent(context) ||
                    isInsideLabelTag(context) ||
                    hasAssociatedLabelViaHtmlFor(node, context) ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context)
                ) {
                    return;
                }

                context.report({
                    node,
                    messageId: `missingLabelOnInput`
                });
            }
        };
    }
});

export default rule;
