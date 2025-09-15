// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
const elementType = require("jsx-ast-utils").elementType;
import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledField: "Accessibility: Field must have label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Field must have label",
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
                // if it is not a Spinner, return
                if (elementType(node) !== "Field") {
                    return;
                }

                if (hasNonEmptyProp(node.attributes, "label")) {
                    return;
                }

                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledField`
                });
            }
        };
    }
});

export default rule;
