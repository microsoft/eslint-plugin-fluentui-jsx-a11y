// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledBreadcrumb: "Accessibility: Breadcrumb must have an accessible label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        docs: {
            description: "All interactive elements must have an accessible name",
            recommended: false,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a Breadcrumb, return
                if (elementType(node as JSXOpeningElement) !== "Breadcrumb") {
                    return;
                }

                // if the Breadcrumb has a label, if the Breadcrumb has an associated label, return
                if (
                    hasNonEmptyProp(node.attributes, "aria-label") || //aria-label
                    hasAssociatedLabelViaAriaLabelledBy(node, context) // aria-labelledby
                ) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledBreadcrumb`
                });
            }
        };
    }
});

export default rule;
