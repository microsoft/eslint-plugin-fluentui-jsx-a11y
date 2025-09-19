// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/utils";
import { TSESLint } from "@typescript-eslint/utils";
import { flattenChildren } from "./flattenChildren";
import { hasNonEmptyProp } from "./hasNonEmptyProp";
import { hasAssociatedAriaText } from "./labelUtils";

/**
 * Checks if a JSX element has properly labeled child elements that can serve as an accessible name.
 * This includes child elements with alt text, aria-label, title attributes, or other accessibility attributes.
 *
 * Examples of labeled children:
 * - <img alt="User profile" />
 * - <svg title="Close icon" />
 * - <Icon aria-label="Settings" />
 * - <span role="img" aria-label="Emoji">🎉</span>
 * - <div aria-labelledby="existingId">Content</div>
 *
 * @param openingElement - The JSX opening element to check
 * @param context - ESLint rule context for accessing source code and validating references
 * @returns true if the element has accessible labeled children
 */
export const hasLabeledChild = (openingElement: TSESTree.JSXOpeningElement, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    try {
        let node: TSESTree.JSXElement | null = null;

        if (openingElement.parent && openingElement.parent.type === "JSXElement") {
            node = openingElement.parent as TSESTree.JSXElement;
        }

        if (!node?.children || node.children.length === 0) {
            return false;
        }

        const allChildren = flattenChildren(node);

        return allChildren.some(child => {
            if (child.type === "JSXElement") {
                const childOpeningElement = child.openingElement;
                const childName = childOpeningElement.name;

                if (childName.type === "JSXIdentifier") {
                    const tagName = childName.name.toLowerCase();

                    if ((tagName === "img" || tagName === "image") && hasNonEmptyProp(childOpeningElement.attributes, "alt")) {
                        return true;
                    }

                    if (tagName === "svg") {
                        return (
                            hasNonEmptyProp(childOpeningElement.attributes, "title") ||
                            hasNonEmptyProp(childOpeningElement.attributes, "aria-label") ||
                            hasAssociatedAriaText(childOpeningElement, context, "aria-labelledby")
                        );
                    }

                    if (hasNonEmptyProp(childOpeningElement.attributes, "role")) {
                        const roleProp = childOpeningElement.attributes.find(
                            attr => attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier" && attr.name.name === "role"
                        );

                        if (roleProp?.type === "JSXAttribute" && roleProp.value?.type === "Literal" && roleProp.value.value === "img") {
                            return (
                                hasNonEmptyProp(childOpeningElement.attributes, "aria-label") ||
                                hasAssociatedAriaText(childOpeningElement, context, "aria-labelledby")
                            );
                        }
                    }

                    if (
                        tagName.toLowerCase().includes("icon") ||
                        hasNonEmptyProp(childOpeningElement.attributes, "aria-label") ||
                        hasNonEmptyProp(childOpeningElement.attributes, "title") ||
                        hasAssociatedAriaText(childOpeningElement, context, "aria-labelledby")
                    ) {
                        return true;
                    }
                }
            }

            return false;
        });
    } catch (error) {
        return false;
    }
};
