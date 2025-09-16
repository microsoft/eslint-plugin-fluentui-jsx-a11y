// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const elementType = require("jsx-ast-utils").elementType;
import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        docs: {
            description: "Accessibility: Image must have alt attribute",
            recommended: "error"
        },
        messages: {
            imageNeedsAlt: "Accessibility: Image must have alt attribute with a meaningful description of the image"
        },
        schema: []
    },
    defaultOptions: [], // no options needed
    create(context) {
        return {
            // Listen for variable declarations
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                // No error if the element is not an Image
                if (elementType(node) !== "Image") {
                    return;
                }

                // No error if alt prop exists and is non-empty
                if (hasNonEmptyProp(node.attributes, "alt")) {
                    return;
                }

                context.report({
                    node,
                    messageId: "imageNeedsAlt"
                });
            }
        };
    }
});

export default rule;
