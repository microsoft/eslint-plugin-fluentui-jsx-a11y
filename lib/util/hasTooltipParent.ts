// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { elementType } from "jsx-ast-utils";
import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";

// Type guard to check if a node is a JSXElement
const isJSXElement = (node: TSESTree.Node): node is TSESTree.JSXElement => {
    return node.type === "JSXElement";
};

const hasToolTipParent = (context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    const ancestors = context.getAncestors();

    if (!ancestors || ancestors.length === 0) {
        return false;
    }

    // Iterate through ancestors and return false if a non-JSXElement is found before a Tooltip
    for (const item of ancestors) {
        if (!isJSXElement(item)) {
            return false; // Stop if a non-JSXElement is encountered
        }

        const { openingElement } = item;
        if (
            openingElement &&
            openingElement.type === "JSXOpeningElement" &&
            elementType(openingElement as unknown as JSXOpeningElement) === "Tooltip"
        ) {
            return true; // Return true if we find a Tooltip
        }
    }

    return false;
};

export { hasToolTipParent };
