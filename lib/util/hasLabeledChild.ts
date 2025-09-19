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
        // Find the parent JSX element - it should be the immediate parent of the opening element
        let node: TSESTree.JSXElement | null = null;

        // The openingElement's parent should be the JSXElement
        if (openingElement.parent && openingElement.parent.type === "JSXElement") {
            node = openingElement.parent as TSESTree.JSXElement;
        }

        // If no parent node or no children, return false
        if (!node?.children || node.children.length === 0) {
            return false;
        }

        // Get all child elements (flattened to handle nested structures)
        const allChildren = flattenChildren(node);

        // Check if any child has accessible labeling
        return allChildren.some(child => {
            if (child.type === "JSXElement") {
                const childOpeningElement = child.openingElement;
                const childName = childOpeningElement.name;

                // Check if child is an element that can provide accessible names
                if (childName.type === "JSXIdentifier") {
                    const tagName = childName.name.toLowerCase();

                    // Image elements with alt text
                    if ((tagName === "img" || tagName === "image") && hasNonEmptyProp(childOpeningElement.attributes, "alt")) {
                        return true;
                    }

                    // SVG elements with title or aria-label
                    if (tagName === "svg") {
                        return (
                            hasNonEmptyProp(childOpeningElement.attributes, "title") ||
                            hasNonEmptyProp(childOpeningElement.attributes, "aria-label") ||
                            hasAssociatedAriaText(childOpeningElement, context, "aria-labelledby")
                        );
                    }

                    // Elements with role="img" and aria-label (like icons, emojis)
                    if (hasNonEmptyProp(childOpeningElement.attributes, "role")) {
                        const roleProp = childOpeningElement.attributes.find(
                            attr => attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier" && attr.name.name === "role"
                        );

                        // Type guard to ensure we have a JSXAttribute with a value
                        if (roleProp?.type === "JSXAttribute" && roleProp.value?.type === "Literal" && roleProp.value.value === "img") {
                            return (
                                hasNonEmptyProp(childOpeningElement.attributes, "aria-label") ||
                                hasAssociatedAriaText(childOpeningElement, context, "aria-labelledby")
                            );
                        }
                    }

                    // FluentUI Icon components or any element with aria-label/title/aria-labelledby
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
        // Fail safely - if we can't determine, assume no labeled children
        return false;
    }
};
