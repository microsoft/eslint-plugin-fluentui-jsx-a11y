// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { elementType } from "jsx-ast-utils";
import { TSESLint } from "@typescript-eslint/utils"; // Assuming context comes from TSESLint
import { JSXOpeningElement } from "estree-jsx";

const hasToolTipParent = (context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    const ancestors = context.getAncestors();

    if (!ancestors || ancestors.length === 0) {
        return false;
    }

    return ancestors.some(
        item =>
            item.type === "JSXElement" &&
            item.openingElement &&
            item.openingElement.type === "JSXOpeningElement" &&
            elementType(item.openingElement as unknown as JSXOpeningElement) === "Tooltip"
    );
};

export { hasToolTipParent };
