// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const ruleBoilerplate = (name, description) => `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// RuleCreator requires a URL or documentation link, but it can be a placeholder
const createRule = ESLintUtils.RuleCreator(name => "https://example.com/rule/${name}");

const rule = createRule({
    name: "${name}",
    meta: {
        type: "suggestion", // could be "problem", "suggestion", or "layout"
        docs: {
            description: "${description}",
            recommended: "error" // could also be "warn"
        },
        messages: {
            errorMessage: "" // describe the issue
        },
        schema: [] // no options for this rule
    },
    defaultOptions: [], // no options needed
    create(context) {
        return {
            // Listen for variable declarations
            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                context.report({
                    node,
                    messageId: "errorMessage"
                });
            }
        };
    }
});

export default rule;
`;
module.exports = ruleBoilerplate;
