/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: "Accessibility: Object literal image buttons must have accessible labelling: aria-label"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description:
                "Accessibility: Object literal image buttons must have accessible labelling: aria-label, aria-labelledby, aria-describedby",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: [] // no options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            ObjectExpression(node) {
                // empty object
                if (node.properties.length === 0) {
                    return;
                }

                // if the object literal is a button icon
                let isIconButtonLiteral = false;

                // if the object literal has accessible labelling
                let hasAccessibleLabelling = false;

                // loop over the keys in the node's properties
                node.properties.forEach(property => {
                    // node has no keys, skip it
                    if (!property.key) {
                        return;
                    }

                    // check if the icon button is an object literal
                    let keyName = property.key.name ? property.key.name : property.key.value;
                    if (keyName === "icon") {
                        isIconButtonLiteral = true;
                    }

                    // check if the object literal has accessible labelling
                    if (
                        keyName === "aria-label" ||
                        keyName === "content" ||
                        keyName === "aria-labelledby" ||
                        keyName === "aria-describedby"
                    ) {
                        hasAccessibleLabelling = true;
                    }
                });

                // if it does not have icon or iconOnly (not an image button), return
                if (!isIconButtonLiteral) {
                    return;
                }

                // correct implementation
                if (isIconButtonLiteral & hasAccessibleLabelling) {
                    return;
                }

                // no aria
                context.report({
                    node,
                    messageId: `missingAriaLabel`
                });
            }
        };
    }
};
