// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { hasNonEmptyProp } = require("../util/hasNonEmptyProp");

var hasProp = require("jsx-ast-utils").hasProp;
var elementType = require("jsx-ast-utils").elementType;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingAriaLabel: "Accessibility: Image buttons must have an accessible name"
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: "problem",
        // docs for the rule
        docs: {
            description:
                "Accessibility: Image buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby",
            recommended: true,
            url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
        },
        schema: []
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                // console.log(node);

                const openingElement = node.openingElement;

                // if it is not a button, return
                if (elementType(openingElement) !== "Button") {
                    return;
                }

                // if it is not an icon button, return
                if (!hasProp(openingElement.attributes, "icon")) {
                    return;
                }

                // if it has a tooltip, return
                // if (hasToolTipParent(node)) {
                //     return;
                // }

                console.log(node.children);
                // if it has text content, return
                const hasTextChild =
                    node.children == null
                        ? false
                        : node.children.filter(element => {
                              return element.type === "JSXText" && element.value.trim().length > 0;
                          });
                console.log("hasTextChild ", hasTextChild);
                if (hasTextChild) {
                    return;
                }

                const hasAccessibleLabelling =
                    hasNonEmptyProp(openingElement.attributes, "title") ||
                    hasNonEmptyProp(openingElement.attributes, "aria-label") ||
                    hasNonEmptyProp(openingElement.attributes, "aria-labelledby") ||
                    hasNonEmptyProp(openingElement.attributes, "aria-describedby");

                // if it has no accessible name, report error
                if (!hasAccessibleLabelling) {
                    context.report({
                        node,
                        messageId: `missingAriaLabel`
                    });
                }
            }
        };
    }
};
