// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/utils";
import { getProp, getPropValue } from "jsx-ast-utils";
import { JSXAttribute } from "estree-jsx";

/**
 * Checks if a value is a non-empty string
 */
const isNonEmptyString = (value: any): boolean => {
    return typeof value === "string" && value.trim().length > 0;
};

/**
 * Validates nested properties within a complex prop (object prop).
 * This is useful for props like dismissIcon={{ "aria-label": "close", role: "button" }}
 * where you need to check specific properties within the object.
 */
export const hasValidNestedProp = (openingElement: TSESTree.JSXOpeningElement, propName: string, nestedKey: string): boolean => {
    const prop = getProp(openingElement.attributes as JSXAttribute[], propName);
    if (!prop) {
        return false;
    }

    const propValue = getPropValue(prop);
    return Boolean(propValue && typeof propValue === "object" && isNonEmptyString((propValue as any)[nestedKey]));
};
