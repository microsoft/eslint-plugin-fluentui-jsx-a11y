// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/utils";
import { hasNonEmptyProp } from "./hasNonEmptyProp";

/**
 * Common prop names that indicate a loading state in FluentUI components
 */
const LOADING_STATE_PROPS = ["loading", "isLoading", "pending", "isPending", "busy", "isBusy"] as const;

/**
 * Determines if the component has any loading state indicator prop
 * @param attributes - JSX attributes array
 * @returns boolean indicating if component has loading state
 */
export const hasLoadingState = (attributes: TSESTree.JSXOpeningElement["attributes"]): boolean => {
    return LOADING_STATE_PROPS.some(prop => hasNonEmptyProp(attributes, prop));
};

/**
 * Gets the specific loading prop that is present (for better error messages)
 * @param attributes - JSX attributes array
 * @returns string name of the loading prop found, or null if none
 */
export const getLoadingStateProp = (attributes: TSESTree.JSXOpeningElement["attributes"]): string | null => {
    return LOADING_STATE_PROPS.find(prop => hasNonEmptyProp(attributes, prop)) ?? null;
};
