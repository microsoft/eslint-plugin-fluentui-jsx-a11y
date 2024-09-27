// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { elementType } from "jsx-ast-utils";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { JSXOpeningElement } from "estree-jsx";

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: 'Accessibility - ratings must have an accessible name or an itemLabel that generates an aria label'
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Ratings must have accessible labelling: name, aria-label, aria-labelledby or itemLabel which generates aria-label",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },

    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // if it is not a listed component, return
                if (
                    elementType(node as JSXOpeningElement) !== "Rating"
                ) {
                    return;
                }

                // wrapped in Label tag, labelled with htmlFor, labelled with aria-labelledby
                if (
                    hasNonEmptyProp(node.attributes, "itemLabel") ||
                    hasNonEmptyProp(node.attributes, "name") ||
                    hasNonEmptyProp(node.attributes, "aria-label") ||
                    hasAssociatedLabelViaAriaLabelledBy(node, context)
                ) {
                    return;
                }

                context.report({
                    node,
                    messageId: `missingAriaLabel`
                });
            }
        };
    }
});

export default rule;
