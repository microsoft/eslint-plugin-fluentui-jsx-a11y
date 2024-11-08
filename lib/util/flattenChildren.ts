// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/types";

// Flatten the JSX tree structure by recursively collecting all child elements
const flattenChildren = (node: TSESTree.JSXElement): TSESTree.JSXElement[] => {
    const flatChildren: TSESTree.JSXElement[] = [];

    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            if (child.type === "JSXElement") {
                const jsxChild = child as TSESTree.JSXElement;
                flatChildren.push(jsxChild, ...flattenChildren(jsxChild));
            }
        });
    }

    return flatChildren;
};

export { flattenChildren };
