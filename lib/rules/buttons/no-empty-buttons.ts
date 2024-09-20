// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType, hasProp } from "jsx-ast-utils";
import { hasTextContentChild } from "../../util/hasTextContentChild";
import { hasNonEmptyProp } from "../../util/hasNonEmptyProp";
import { JSXAttribute, JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const allowedComponents = ["Button", "ToggleButton", "SplitButton", "MenuButton", "CompoundButton"];

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the lint rule
        messages: {
            noEmptyButtons: `Accessibility: no empty ${allowedComponents.join(", ")}`
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: `Accessibility: ${allowedComponents.join(", ")} must either text content or icon or child component`,
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: [] // no options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it is not a button, return
                if (!allowedComponents.includes(elementType(openingElement as JSXOpeningElement))) {
                    return;
                }

                // if it has text content, return
                if (hasTextContentChild(node)) return;

                // if there is icon prop, return
                if (hasProp(openingElement.attributes as JSXAttribute[], "icon")) {
                    return;
                }

                // if split button has secondary content, return
                if (
                    elementType(openingElement as JSXOpeningElement) === "CompoundButton" &&
                    hasNonEmptyProp(openingElement.attributes, "secondaryContent")
                ) {
                    return;
                }

                const hasChildren = node.children.length > 0;

                // if there are children, return
                if (hasChildren) return;

                return context.report({
                    node,
                    messageId: `noEmptyButtons`
                });
            }
        };
    }
});

export default rule;
