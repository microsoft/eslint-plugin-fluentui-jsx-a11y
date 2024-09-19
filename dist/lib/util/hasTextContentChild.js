"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * hasTextContentChild - determines if a component has text content as a child e.g. <Button>Hello</Button>
 * @param {*} node JSXElement
 * @returns boolean
 */
function hasTextContentChild(node) {
    // no children
    if (node.children == null || node.children == undefined || node.children.length === 0) {
        return false;
    }
    const result = node.children.filter(element => {
        return element.type === "JSXText" && element.value.trim().length > 0;
    });
    return result != null;
}
module.exports = {
    hasTextContentChild
};
