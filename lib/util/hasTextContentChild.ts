// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/types";

/**
 * hasTextContentChild - determines if a component has text content as a child, e.g., <Button>Hello</Button>, <Button>{'Hello'}</Button>, <Button>{myFunc()}</Button>, or <Button>{myVar}</Button>
 * @param {*} node JSXElement
 * @returns boolean
 */
const hasTextContentChild = (node?: TSESTree.JSXElement) => {
    // no children
    if (!node) {
        return false;
    }

    if (!node.children || node.children.length === 0) {
        return false;
    }

    const result = node.children.filter(element => {
        // Check for JSXText with non-whitespace content
        if (element.type === "JSXText" && element.value.trim().length > 0) {
            return true;
        }

        // Check for JSXExpressionContainer with valid expression content
        if (
            element.type === "JSXExpressionContainer" &&
            element.expression &&
            ((element.expression.type === "Literal" && String(element.expression.value).trim().length > 0) ||
                element.expression.type === "CallExpression" ||
                element.expression.type === "Identifier")
        ) {
            return true;
        }

        return false;
    });

    return result.length !== 0;
};

export { hasTextContentChild };
