// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
const { hasFieldParent } = require("../util/hasFieldParent");
const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");
const elementType = require("jsx-ast-utils").elementType;
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
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
            recommended: true,
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
                if (elementType(node) !== "ProgressBar") {
                    return;
                }
                // check if the ProgressBar has a Field parent
                const hasFieldParentCheck = hasFieldParent(context);
                // If no Field parent, ensure one of the aria-label or aria-labelledby is provided as well as aria-describedby
                const hasLabelling = (hasNonEmptyProp(node.attributes, "aria-label") || hasNonEmptyProp(node.attributes, "aria-labelledby")) &&
                    hasNonEmptyProp(node.attributes, "aria-describedby");
                const mandatoryAttributes = [];
                // Check if max is provided, if not, require aria-valuemax
                const hasMaxProp = hasNonEmptyProp(node.attributes, "max");
                if (!hasMaxProp) {
                    mandatoryAttributes.push("aria-valuemax");
                    mandatoryAttributes.push("aria-valuemin");
                    mandatoryAttributes.push("aria-valuenow");
                }
                // If all mandatory attributes (including optional aria-valuemax) are present, return
                if (mandatoryAttributes.every(attribute => hasNonEmptyProp(node.attributes, attribute)) &&
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
};
