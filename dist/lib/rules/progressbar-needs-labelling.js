"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasFieldParent_1 = require("../util/hasFieldParent");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledProgressbar: "Accessibility: Progressbar must have aria-valuemin, aria-valuemax, aria-valuenow, aria-describedby and either aria-label or aria-labelledby attributes"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description: "Accessibility: Progressbar must have aria-valuemin, aria-valuemax, aria-valuenow, aria-describedby and either aria-label or aria-labelledby attributes",
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
                // if it is not a ProgressBar, return
                if ((0, jsx_ast_utils_1.elementType)(node) !== "ProgressBar") {
                    return;
                }
                // check if the ProgressBar has a Field parent
                const hasFieldParentCheck = (0, hasFieldParent_1.hasFieldParent)(context);
                // If no Field parent, ensure one of the aria-label or aria-labelledby is provided as well as aria-describedby
                const hasLabelling = ((0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-label") || (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-labelledby")) &&
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "aria-describedby");
                const mandatoryAttributes = [];
                // Check if max is provided, if not, require aria-valuemax
                const hasMaxProp = (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, "max");
                if (!hasMaxProp) {
                    mandatoryAttributes.push("aria-valuemax");
                    mandatoryAttributes.push("aria-valuemin");
                    mandatoryAttributes.push("aria-valuenow");
                }
                // If all mandatory attributes (including optional aria-valuemax) are present, return
                if (mandatoryAttributes.every(attribute => (0, hasNonEmptyProp_1.hasNonEmptyProp)(node.attributes, attribute)) &&
                    (hasFieldParentCheck || hasLabelling)) {
                    return;
                }
                // if it has no visual labelling, report error
                context.report({
                    node,
                    messageId: `noUnlabelledProgressbar`
                });
            }
        };
    }
});
exports.default = rule;
