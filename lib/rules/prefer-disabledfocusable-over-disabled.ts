// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasLoadingState, getLoadingStateProp } from "../util/hasLoadingState";
import { disabledFocusableComponents } from "../applicableComponents/disabledFocusableComponents";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        messages: {
            preferDisabledFocusable:
                "Accessibility: Prefer 'disabledFocusable={{{{loadingProp}}}}}' over 'disabled={{{{loadingProp}}}}}' when component has loading state '{{loadingProp}}' to maintain keyboard navigation accessibility",
            preferDisabledFocusableGeneric:
                "Accessibility: Prefer 'disabledFocusable' over 'disabled' when component has loading state to maintain keyboard navigation accessibility"
        },
        type: "suggestion", // This is a suggestion for better accessibility
        docs: {
            description:
                "Prefer 'disabledFocusable' over 'disabled' when component has loading state to maintain keyboard navigation accessibility",
            recommended: "warn",
            url: "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/"
        },
        fixable: "code", // Allow auto-fixing
        schema: []
    },

    create(context) {
        return {
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                const componentName = elementType(node as JSXOpeningElement);

                // Check if this is an applicable component
                if (!disabledFocusableComponents.includes(componentName as any)) {
                    return;
                }

                // Check if component has 'disabled' prop
                const hasDisabled = hasNonEmptyProp(node.attributes, "disabled");
                if (!hasDisabled) {
                    return;
                }

                // Check if component has loading state
                const hasLoading = hasLoadingState(node.attributes);
                if (!hasLoading) {
                    return;
                }

                // Check if component already has disabledFocusable (avoid conflicts)
                const hasDisabledFocusable = hasNonEmptyProp(node.attributes, "disabledFocusable");
                if (hasDisabledFocusable) {
                    return; // Don't report if both are present - that's a different issue
                }

                const loadingProp = getLoadingStateProp(node.attributes);

                context.report({
                    node,
                    messageId: loadingProp ? "preferDisabledFocusable" : "preferDisabledFocusableGeneric",
                    data: {
                        loadingProp: loadingProp || "loading"
                    },
                    fix(fixer) {
                        // Find the disabled attribute and replace it with disabledFocusable
                        const disabledAttr = node.attributes.find(
                            attr => attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier" && attr.name.name === "disabled"
                        );

                        if (disabledAttr && disabledAttr.type === "JSXAttribute" && disabledAttr.name) {
                            return fixer.replaceText(disabledAttr.name, "disabledFocusable");
                        }
                        return null;
                    }
                });
            }
        };
    }
});

export default rule;
