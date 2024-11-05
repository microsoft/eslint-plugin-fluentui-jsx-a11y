// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/types";
import { elementType } from "jsx-ast-utils";
import { TSESLint } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";

// Function to check if the current node has a "Field" parent JSXElement
export function hasFieldParent(context: TSESLint.RuleContext<string, unknown[]>): boolean {
    const ancestors: TSESTree.Node[] = context.getAncestors();

    if (ancestors == null || ancestors.length === 0) {
        return false;
    }

    let field = false;

    ancestors.forEach(item => {
        if (
            item.type === "JSXElement" &&
            item.openingElement != null &&
            item.openingElement.type === "JSXOpeningElement" &&
            elementType(item.openingElement as unknown as JSXOpeningElement) === "Field"
        ) {
            field = true;
        }
    });

    return field;
}
