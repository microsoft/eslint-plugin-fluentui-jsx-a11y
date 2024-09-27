"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasTooltipParent_1 = require("../util/hasTooltipParent");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
// Define an array of allowed component names
const allowedComponents = ["MenuItem", "SpinButton"];
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the lint rule
        messages: {
            tooltipNotRecommended: `Accessibility: Tooltop not recommended for these components ${allowedComponents.join(", ")}`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: `Accessibility: Prefer text content or aria over a tooltip for these components ${allowedComponents.join(", ")}`,
            recommended: 'strict',
        },
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a listed component, return
                if (!allowedComponents.includes((0, jsx_ast_utils_1.elementType)(openingElement))) {
                    return;
                }
                // if there are is tooltip, report
                if ((0, hasTooltipParent_1.hasToolTipParent)(context)) {
                    context.report({
                        node,
                        messageId: `tooltipNotRecommended`
                    });
                }
            }
        };
    }
});
exports.default = rule;
