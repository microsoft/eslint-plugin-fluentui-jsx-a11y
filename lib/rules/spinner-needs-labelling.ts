// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
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
            noUnlabelledSpinner: "Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Spinner must have either aria-label or label, aria-live and aria-busy attributes",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        fixable: "code",
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a Spinner, return
                if (elementType(node as JSXOpeningElement) !== "Spinner") {
                    return;
                }

                if (
                    hasNonEmptyProp(node.attributes, "aria-busy") &&
                    hasNonEmptyProp(node.attributes, "aria-live") &&
                    (hasNonEmptyProp(node.attributes, "label") || hasNonEmptyProp(node.attributes, "aria-label"))
                ) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledSpinner`,
                    fix(fixer) {
                        const fixes = [];

                        // Add missing aria-label if neither label nor aria-label exist
                        if (!hasNonEmptyProp(node.attributes, "label") && !hasNonEmptyProp(node.attributes, "aria-label")) {
                            fixes.push(fixer.insertTextAfter(node.name, ' aria-label="Loading"'));
                        }

                        // Add missing aria-live
                        if (!hasNonEmptyProp(node.attributes, "aria-live")) {
                            fixes.push(fixer.insertTextAfter(node.name, ' aria-live="polite"'));
                        }

                        // Add missing aria-busy
                        if (!hasNonEmptyProp(node.attributes, "aria-busy")) {
                            fixes.push(fixer.insertTextAfter(node.name, ' aria-busy="true"'));
                        }

                        return fixes;
                    }
                });
            }
        };
    }
});

export default rule;
