// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { applicableComponents } from "../applicableComponents/inputBasedComponents";
import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible warning messages for the lint rule
        messages: {
            visualLabelSuggestion: `Visual label is better than an aria-label`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "Visual label is better than an aria-label because sighted users can't read the aria-label text.",
            recommended: "strict",
            url: undefined // URL to the documentation page for this rule
        },
        fixable: undefined, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a listed component, return
                if (!applicableComponents.includes(elementType(node as unknown as JSXOpeningElement))) {
                    return;
                }

                // if the element contains aria-label, show the warning message
                if (hasNonEmptyProp(node.attributes, "aria-label")) {
                    context.report({
                        node,
                        messageId: `visualLabelSuggestion`
                    });
                }
            }
        };
    }
});

export default rule;
