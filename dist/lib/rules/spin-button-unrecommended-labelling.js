"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const hasTooltipParent_1 = require("../util/hasTooltipParent");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible suggestion messages for the rule
        messages: {
            unRecommendedlabellingSpinButton: "Accessibility: Unrecommended accessibility labelling - SpinButton"
        },
        // "problem" means the rule is identifying something that could be done in a better way but no errors will occur if the code isn’t changed: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "suggestion",
        // docs for the rule
        docs: {
            description: "Accessibility: Unrecommended accessibility labelling - SpinButton",
            recommended: "strict",
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a SpinButton, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "SpinButton") {
                    return;
                }
                // if the SpinButton has an aria-label or is wrapped in a Tooltip, show warning
                if ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") || (0, hasTooltipParent_1.hasToolTipParent)(context)) {
                    context.report({
                        node,
                        messageId: `unRecommendedlabellingSpinButton`
                    });
                }
            }
        };
    }
});
exports.default = rule;
