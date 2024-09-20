// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";
import { hasNonEmptyProp } from "../util/hasNonEmptyProp";
import { hasTextContentChild } from "../util/hasTextContentChild";
import { hasLabelledChildImage } from "../util/hasLabelledChildImage";
import { linkBasedComponents } from "../applicableComponents/linkBasedComponents";
import { hasAssociatedLabelViaAriaLabelledBy } from "../util/labelUtils";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        type: "problem",
        docs: {
            description:
                "Accessibility: Image links must have an accessible name. Add either text content, labelling to the image or labelling to the link itself.",
            recommended: "strict",
            url: "https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/" // URL to the documentation page for this rule
        },
        messages: {
            missingAriaLabel:
                "Accessibility Rule: Image links must have an accessible name. Link can have a title attribute or text content, or Image can have an aria-label, aria-labelledby, or title attribute.",
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
            JSXElement(node: TSESTree.JSXElement) {
                const openingElement = node.openingElement;

                // if it's not a link based component, return
                if (!linkBasedComponents.includes(elementType(openingElement as JSXOpeningElement))) {
                    return;
                }

                const hasHref = hasNonEmptyProp(openingElement.attributes, "href");

                // check if the link has an href
                if (!hasHref) {
                    context.report({
                        node,
                        messageId: `missingHref`
                    });
                }

                // if it has text content, return
                if (hasTextContentChild(node)) {
                    return;
                }

                // if there is a containing image and it is labelled correctly, return
                const hasAccessibleImage = hasLabelledChildImage(node);

                if (hasAccessibleImage) {
                    return;
                }

                // Check if there is an accessible link
                const linkHasAccessibleLabel =
                    hasNonEmptyProp(openingElement.attributes, "title") ||
                    hasNonEmptyProp(openingElement.attributes, "aria-label") ||
                    hasAssociatedLabelViaAriaLabelledBy(openingElement, context);

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

export default rule;
