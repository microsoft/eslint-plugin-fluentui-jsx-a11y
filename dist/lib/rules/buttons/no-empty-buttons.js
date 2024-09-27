"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasTextContentChild_1 = require("../../util/hasTextContentChild");
const hasNonEmptyProp_1 = require("../../util/hasNonEmptyProp");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const allowedComponents = ["Button", "ToggleButton", "SplitButton", "MenuButton", "CompoundButton"];
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
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
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a button, return
                if (!allowedComponents.includes((0, jsx_ast_utils_1.elementType)(openingElement))) {
                    return;
                }
                // if it has text content, return
                if ((0, hasTextContentChild_1.hasTextContentChild)(node))
                    return;
                // if there is icon prop, return
                if ((0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "icon")) {
                    return;
                }
                // if split button has secondary content, return
                if ((0, jsx_ast_utils_1.elementType)(openingElement) === "CompoundButton" &&
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "secondaryContent")) {
                    return;
                }
                const hasChildren = node.children.length > 0;
                // if there are children, return
                if (hasChildren)
                    return;
                return context.report({
                    node,
                    messageId: `noEmptyButtons`
                });
            }
        };
    }
});
exports.default = rule;
