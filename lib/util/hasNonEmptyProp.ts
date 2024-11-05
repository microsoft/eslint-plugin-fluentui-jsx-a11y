// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";
import { hasProp, getPropValue, getProp } from "jsx-ast-utils";

/**
 * Determines if the prop exists and has a non-empty value.
 * @param {*} attributes
 * @param {*} name
 * @returns boolean
 */
const hasNonEmptyProp = (attributes: TSESTree.JSXOpeningElement["attributes"], name: string): boolean => {
    if (!hasProp(attributes as unknown as JSXOpeningElement["attributes"], name)) {
        return false;
    }

    const prop = getProp(attributes as unknown as JSXOpeningElement["attributes"], name);

    // Safely get the value of the prop, handling potential undefined or null values
    const propValue = prop ? getPropValue(prop) : undefined;

    // Check for various types that `getPropValue` could return
    if (propValue === null || propValue === undefined) {
        return false;
    }

    if (typeof propValue === "boolean" || typeof propValue === "number") {
        // Booleans and numbers are considered non-empty if they exist
        return true;
    }

    if (typeof propValue === "string") {
        // For strings, check if it is non-empty
        return propValue.trim().length > 0;
    }

    // Handle other potential types (e.g., arrays, objects)
    if (Array.isArray(propValue)) {
        return propValue.length > 0;
    }

    if (typeof propValue === "object") {
        // Objects are considered non-empty if they have properties
        return Object.keys(propValue).length > 0;
    }

    // If the type is not handled, return false as a fallback
    return false;
};

export { hasNonEmptyProp };
