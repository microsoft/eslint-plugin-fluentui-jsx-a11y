"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
const hasLabelledChildImage_1 = require("../util/hasLabelledChildImage");
const linkBasedComponents_1 = require("../applicableComponents/linkBasedComponents");
const labelUtils_1 = require("../util/labelUtils");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        type: "problem",
        docs: {
            description: "Accessibility: Image links must have an accessible name. Add either text content, labelling to the image or labelling to the link itself.",
            recommended: "strict",
            url: "https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/" // URL to the documentation page for this rule
        },
        messages: {
            missingAriaLabel: "Accessibility Rule: Image links must have an accessible name. Link can have a title attribute or text content, or Image can have an aria-label, aria-labelledby, or title attribute.",
            missingHref: "Links must have an href"
        },
        fixable: "code",
        schema: [] // Add a schema if the rule has options
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it's not a link based component, return
                if (!linkBasedComponents_1.linkBasedComponents.includes((0, jsx_ast_utils_1.elementType)(openingElement))) {
                    return;
                }
                const hasHref = (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "href");
                // check if the link has an href
                if (!hasHref) {
                    context.report({
                        node,
                        messageId: `missingHref`
                    });
                }
                // if it has text content, return
                if ((0, hasTextContentChild_1.hasTextContentChild)(node)) {
                    return;
                }
                // if there is a containing image and it is labelled correctly, return
                const hasAccessibleImage = (0, hasLabelledChildImage_1.hasLabelledChildImage)(node);
                if (hasAccessibleImage) {
                    return;
                }
                // Check if there is an accessible link
                const linkHasAccessibleLabel = (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "title") ||
                    (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "aria-label") ||
                    (0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(openingElement, context);
                if (linkHasAccessibleLabel) {
                    return;
                }
                // Report if there is no text content, accessible link or image
                if (!linkHasAccessibleLabel || !hasAccessibleImage) {
                    context.report({
                        node,
                        messageId: `missingAriaLabel`
                    });
                }
            }
        };
    }
});
exports.default = rule;
