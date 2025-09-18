// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";
import { hasProp, getPropValue, getProp } from "jsx-ast-utils";

/**
 * Determines if the property exists and has a non-nullish value.
 * @param attributes The attributes on the visited node
 * @param name The name of the prop to check
 * @returns Whether the specified prop exists and is not null or undefined
 * @example
 * // <img src="image.png" />
 * hasDefinedProp(attributes, 'src') // true
 * // <img src="" />
 * hasDefinedProp(attributes, 'src') // true
 * // <img src={null} />
 * hasDefinedProp(attributes, 'src') // false
 * // <img src={undefined} />
 * hasDefinedProp(attributes, 'src') // false
 * // <img src={1} />
 * hasDefinedProp(attributes, 'src') // false
 * // <img src={true} />
 * hasDefinedProp(attributes, 'src') // false
 * // <img />
 * hasDefinedProp(attributes, 'src') // false
 */
const hasDefinedProp = (attributes: TSESTree.JSXOpeningElement["attributes"], name: string): boolean => {
    if (!hasProp(attributes as JSXOpeningElement["attributes"], name)) {
        return false;
    }

    const prop = getProp(attributes as JSXOpeningElement["attributes"], name);

    // Safely get the value of the prop, handling potential undefined or null values
    const propValue = prop ? getPropValue(prop) : undefined;

    // Return true if the prop value is not null or undefined
    return propValue !== null && propValue !== undefined;
};

export { hasDefinedProp };
