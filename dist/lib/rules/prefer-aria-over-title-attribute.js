"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const types_1 = require("@typescript-eslint/types");
const jsx_ast_utils_1 = require("jsx-ast-utils");
const labelUtils_1 = require("../util/labelUtils");
const hasNonEmptyProp_1 = require("../util/hasNonEmptyProp");
const hasTooltipParent_1 = require("../util/hasTooltipParent");
const hasTextContentChild_1 = require("../util/hasTextContentChild");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const applicableComponents = ["Button"];
const rule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    defaultOptions: [],
    meta: {
        // possible error messages for the rule
        messages: {
            preferAria: `Prefer aria over the title attribute for accessible labelling: ${applicableComponents.join(", ")}`
        },
        type: "suggestion", // `problem`, `suggestion`, or `layout`
        docs: {
            description: "The title attribute is not consistently read by screen readers, and its behavior can vary depending on the screen reader and the user's settings.",
            recommended: "warn"
        },
        fixable: "code", // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXElement(node) {
                const openingElement = node.openingElement;
                // if it is not a listed component, return
                if (!applicableComponents.includes((0, jsx_ast_utils_1.elementType)(openingElement))) {
                    return;
                }
                // if it is not an icon button, return
                if (!(0, jsx_ast_utils_1.hasProp)(openingElement.attributes, "icon")) {
                    return;
                }
                // if it has a tooltip parent, return
                if ((0, hasTooltipParent_1.hasToolTipParent)(context)) {
                    return;
                }
                // if it has text content, return
                if ((0, hasTextContentChild_1.hasTextContentChild)(node)) {
                    return;
                }
                // the button has an associated label
                if ((0, labelUtils_1.hasAssociatedLabelViaAriaLabelledBy)(openingElement, context)) {
                    return;
                }
                const hasAria = (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "aria-label");
                const hasTitle = (0, hasNonEmptyProp_1.hasNonEmptyProp)(openingElement.attributes, "title");
                // if it has no accessible name, report error
                if (hasTitle && !hasAria) {
                    context.report({
                        node,
                        messageId: `preferAria`,
                        fix(fixer) {
                            const attributes = openingElement.attributes;
                            const titleAttribute = attributes.find(attr => attr.type === types_1.AST_NODE_TYPES.JSXAttribute && attr.name && attr.name.name === "title");
                            // Generate the aria-label attribute
                            const ariaLabel = ` aria-label="${titleAttribute && titleAttribute.type === types_1.AST_NODE_TYPES.JSXAttribute && titleAttribute.value
                                ? titleAttribute.value.value
                                : ""}"`;
                            // Find the location to insert the new attribute
                            const lastAttribute = attributes[attributes.length - 1];
                            const insertPosition = lastAttribute.range[1];
                            return fixer.insertTextAfterRange([insertPosition, insertPosition], ariaLabel);
                        }
                    });
                }
            }
        };
    }
});
exports.default = rule;
