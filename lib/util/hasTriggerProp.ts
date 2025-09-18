// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/utils";
import { hasProp } from "jsx-ast-utils";
import { JSXAttribute } from "estree-jsx";

/**
 * Checks if a component has a specific trigger prop.
 * This is useful for rules that only apply when certain props are present
 * (e.g., dismissible, expandable, collapsible, etc.)
 */
export const hasTriggerProp = (openingElement: TSESTree.JSXOpeningElement, triggerProp: string): boolean => {
    return hasProp(openingElement.attributes as JSXAttribute[], triggerProp);
};
