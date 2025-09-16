// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasToolTipParent } from "../util/hasTooltipParent";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
// Define an array of allowed component names
const allowedComponents = ["MenuItem", "SpinButton"];

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the lint rule
        messages: {
            tooltipNotRecommended: `Accessibility: Tooltop not recommended for these components ${allowedComponents.join(", ")}`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: `Accessibility: Prefer text content or aria over a tooltip for these components ${allowedComponents.join(", ")}`,
            recommended: "strict"
        },
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it is not a listed component, return
                if (!allowedComponents.includes(elementType(openingElement as JSXOpeningElement))) {
                    return;
                }

                // if there are is tooltip, report
                if (hasToolTipParent(context)) {
                    context.report({
                        node,
                        messageId: `tooltipNotRecommended`
                    });
                }
            }
        };
    }
});

export default rule;
