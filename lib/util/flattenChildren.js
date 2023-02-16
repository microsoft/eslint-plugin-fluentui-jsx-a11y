// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function flattenChildren(node) {
        const flatChildren = [];
    
        if (node.children && node.children.length > 0) {
            node.children.forEach((child) => {
                if (child.type === "JSXElement" && child.children && child.children.length > 0) {
                    flatChildren.push(child, ...flattenChildren(child));
                } else {
                    flatChildren.push(child);
                }
            });
        }
        
        return flatChildren;
    }

module.exports.flattenChildren = flattenChildren;