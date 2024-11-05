// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/types";

/**
 * hasTextContentChild - determines if a component has text content as a child e.g. <Button>Hello</Button>
 * @param {*} node JSXElement
 * @returns boolean
 */
const hasTextContentChild = (node?: TSESTree.JSXElement) => {
    // no children
    if (!node) {
        return false;
    }

    if (node.children == null || node.children == undefined || node.children.length === 0) {
        return false;
    }

    const result = node.children.filter(element => {
        return element.type === "JSXText" && element.value.trim().length > 0;
    });

    return result.length !== 0;
};

export { hasTextContentChild };
