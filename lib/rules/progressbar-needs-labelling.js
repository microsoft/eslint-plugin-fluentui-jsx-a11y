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
            noUnlabelledProgressbar:
                "Accessibility: Progressbar must have aria-valuemin, aria-valuemax, aria-valuenow, and aria-describedby attributes"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description:
                "Accessibility: Progressbar must have aria-valuemin, aria-valuemax, aria-valuenow, and aria-describedby attributes",
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

                const mandatoryAttributes = ["aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-describedby"];

                if (mandatoryAttributes.every(attribute => hasNonEmptyProp(node.attributes, attribute)) && hasFieldParent(context)) {
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

