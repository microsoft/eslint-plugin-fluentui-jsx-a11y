// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { flattenChildren } from "./flattenChildren";
import { TSESTree } from "@typescript-eslint/types";
import { hasProp, getPropValue, getProp } from "jsx-ast-utils";
import { hasNonEmptyProp } from "./hasNonEmptyProp";
import { fluentImageComponents, imageDomNodes } from "../applicableComponents/imageBasedComponents";
import { JSXOpeningElement } from "estree-jsx";

const mergedImageComponents = [...fluentImageComponents, ...imageDomNodes];

/**
 * Checks if a JSX element name is a JSXIdentifier and matches a component name.
 * @param name JSXTagNameExpression
 * @returns boolean
 */
const isJSXIdentifierWithName = (name: TSESTree.JSXTagNameExpression, validNames: string[]): boolean => {
    return name.type === "JSXIdentifier" && validNames.includes(name.name);
};

/**
 * Determines if a component has an accessible image as a child.
 * @param {*} node JSXElement
 * @returns boolean
 */
const hasLabelledChildImage = (node: TSESTree.JSXElement): boolean => {
    if (!node.children || node.children.length === 0) {
        return false;
    }

    return flattenChildren(node).some(child => {
        if (child.type === "JSXElement" && isJSXIdentifierWithName(child.openingElement.name, mergedImageComponents)) {
            const attributes = child.openingElement.attributes;
            return !isImageHidden(attributes) && hasAccessibilityAttributes(attributes);
        }
        return false;
    });
};

/**
 * Checks if an image element has any of the attributes indicating it is accessible.
 * @param {*} attributes JSX attributes of the image element
 * @returns boolean
 */
const hasAccessibilityAttributes = (attributes: TSESTree.JSXOpeningElement["attributes"]): boolean => {
    return (
        hasNonEmptyProp(attributes, "title") ||
        hasNonEmptyProp(attributes, "alt") ||
        hasNonEmptyProp(attributes, "aria-label") ||
        hasNonEmptyProp(attributes, "aria-labelledby")
    );
};

/**
 * Checks if an image element is marked as hidden using `aria-hidden` or has an empty `alt` attribute.
 * @param {*} attributes JSX attributes of the image element
 * @returns boolean
 */
const isImageHidden = (attributes: TSESTree.JSXOpeningElement["attributes"]): boolean => {
    // Check if the image has the `aria-hidden` attribute
    if (hasProp(attributes as unknown as JSXOpeningElement["attributes"], "aria-hidden")) {
        return true;
    }

    // Check if the image has an `aria-label` or `aria-labelledby` attribute with a non-empty value
    const ariaLabelProp = getProp(attributes as unknown as JSXOpeningElement["attributes"], "aria-label");
    const ariaLabelledbyProp = getProp(attributes as unknown as JSXOpeningElement["attributes"], "aria-labelledby");

    if (ariaLabelProp) {
        const ariaLabelValue = getPropValue(ariaLabelProp);
        if (ariaLabelValue) {
            return false; // If `aria-label` is present and has a value, the image is not hidden
        }
    }

    if (ariaLabelledbyProp) {
        const ariaLabelledbyValue = getPropValue(ariaLabelledbyProp);
        if (ariaLabelledbyValue) {
            return false; // If `aria-labelledby` is present and has a value, the image is not hidden
        }
    }

    // Check if the image has an `alt` attribute and return true if the `alt` value is falsy
    const altProp = getProp(attributes as unknown as JSXOpeningElement["attributes"], "alt");
    if (altProp) {
        const altValue = getPropValue(altProp);
        return !altValue; // Returns true if `altValue` is falsy (e.g., empty string, null, or undefined)
    }

    return true; // If neither `alt`, `aria-label`, nor `aria-labelledby` is present, consider the image hidden
};

export { hasLabelledChildImage, isImageHidden, hasAccessibilityAttributes, isJSXIdentifierWithName };
