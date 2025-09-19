// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    hasLabelledChildImage,
    isImageHidden,
    hasAccessibilityAttributes,
    isJSXIdentifierWithName
} from "../../../../lib/util/hasLabelledChildImage";
import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/types";
import { fluentImageComponents, imageDomNodes } from "../../../../lib/applicableComponents/imageBasedComponents";
const mergedImageComponents = [...fluentImageComponents, ...imageDomNodes];

// Helper function to create mock loc and range
const createMockLocRange = () => ({
    loc: { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } },
    range: [0, 0] as [number, number]
});

// Unit tests
describe("isJSXIdentifierWithName", () => {
    it("returns true for a JSXIdentifier with a valid name", () => {
        const name: TSESTree.JSXIdentifier = { type: AST_NODE_TYPES.JSXIdentifier, name: "img", ...createMockLocRange() };
        expect(isJSXIdentifierWithName(name, mergedImageComponents)).toBe(true);
    });

    it("returns false for a JSXIdentifier with an invalid name", () => {
        const name: TSESTree.JSXIdentifier = { type: AST_NODE_TYPES.JSXIdentifier, name: "div", ...createMockLocRange() };
        expect(isJSXIdentifierWithName(name, mergedImageComponents)).toBe(false);
    });
});

describe("hasAccessibilityAttributes", () => {
    it("returns true if any accessible attribute is non-empty", () => {
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "alt", ...createMockLocRange() },
                value: {
                    type: AST_NODE_TYPES.Literal,
                    value: "An image description",
                    raw: '"An image description"',
                    ...createMockLocRange()
                },
                ...createMockLocRange()
            }
        ];
        expect(hasAccessibilityAttributes(attributes)).toBe(true);
    });

    it("returns false if no accessible attribute is present", () => {
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "aria-hidden", ...createMockLocRange() },
                value: { type: AST_NODE_TYPES.Literal, value: "true", raw: '"true"', ...createMockLocRange() },
                ...createMockLocRange()
            }
        ];
        expect(hasAccessibilityAttributes(attributes)).toBe(false);
    });
});

describe("isImageHidden", () => {
    it("returns true if `aria-hidden` is set", () => {
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "aria-hidden", ...createMockLocRange() },
                value: { type: AST_NODE_TYPES.Literal, value: "true", raw: '"true"', ...createMockLocRange() },
                ...createMockLocRange()
            }
        ];
        expect(isImageHidden(attributes)).toBe(true);
    });

    it("returns true if `alt` attribute is empty", () => {
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "alt", ...createMockLocRange() },
                value: { type: AST_NODE_TYPES.Literal, value: "", raw: '""', ...createMockLocRange() },
                ...createMockLocRange()
            }
        ];
        expect(isImageHidden(attributes)).toBe(true);
    });

    it("returns false if `alt` attribute is non-empty", () => {
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "alt", ...createMockLocRange() },
                value: { type: AST_NODE_TYPES.Literal, value: "Image description", raw: '"Image description"', ...createMockLocRange() },
                ...createMockLocRange()
            }
        ];
        expect(isImageHidden(attributes)).toBe(false);
    });
});

describe("hasLabelledChildImage", () => {
    it("returns true if a child image component with accessibility attributes is found", () => {
        const mockChild: TSESTree.JSXElement = {
            type: AST_NODE_TYPES.JSXElement,
            openingElement: {
                type: AST_NODE_TYPES.JSXOpeningElement,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "img", ...createMockLocRange() },
                attributes: [
                    {
                        type: AST_NODE_TYPES.JSXAttribute,
                        name: { type: AST_NODE_TYPES.JSXIdentifier, name: "alt", ...createMockLocRange() },
                        value: { type: AST_NODE_TYPES.Literal, value: "description", raw: '"description"', ...createMockLocRange() },
                        ...createMockLocRange()
                    }
                ],
                selfClosing: false,
                ...createMockLocRange()
            },
            closingElement: null,
            children: [],
            ...createMockLocRange()
        };

        const node: TSESTree.JSXElement = {
            type: AST_NODE_TYPES.JSXElement,
            openingElement: {
                type: AST_NODE_TYPES.JSXOpeningElement,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "Container", ...createMockLocRange() },
                attributes: [],
                selfClosing: false,
                ...createMockLocRange()
            },
            closingElement: null,
            children: [mockChild],
            ...createMockLocRange()
        };
        expect(hasLabelledChildImage(node)).toBe(true);
    });

    it("returns false if no image component is found", () => {
        const node: TSESTree.JSXElement = {
            type: AST_NODE_TYPES.JSXElement,
            openingElement: {
                type: AST_NODE_TYPES.JSXOpeningElement,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "div", ...createMockLocRange() },
                attributes: [],
                selfClosing: false,
                ...createMockLocRange()
            },
            closingElement: null,
            children: [],
            ...createMockLocRange()
        };

        expect(hasLabelledChildImage(node)).toBe(false);
    });
});

describe("hasLabelledChildImage - missing coverage", () => {
    it("covers line 34 - handles non-JSXElement children", () => {
        // This test covers the case where children exist but are not JSXElement types
        const mockTextChild: TSESTree.JSXText = {
            type: AST_NODE_TYPES.JSXText,
            value: "Some text content",
            raw: "Some text content",
            ...createMockLocRange()
        };

        const mockExpressionChild: TSESTree.JSXExpressionContainer = {
            type: AST_NODE_TYPES.JSXExpressionContainer,
            expression: {
                type: AST_NODE_TYPES.Literal,
                value: "expression",
                raw: '"expression"',
                ...createMockLocRange()
            },
            ...createMockLocRange()
        };

        const node: TSESTree.JSXElement = {
            type: AST_NODE_TYPES.JSXElement,
            openingElement: {
                type: AST_NODE_TYPES.JSXOpeningElement,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "Container", ...createMockLocRange() },
                attributes: [],
                selfClosing: false,
                ...createMockLocRange()
            },
            closingElement: null,
            children: [mockTextChild, mockExpressionChild], // Non-JSXElement children
            ...createMockLocRange()
        };

        // This should execute line 34 and return false since no JSXElement children are found
        expect(hasLabelledChildImage(node)).toBe(false);
    });

    it("covers line 34 - JSXElement child with non-image component name", () => {
        // This covers the case where we have JSXElement children but they're not image components
        const mockDivChild: TSESTree.JSXElement = {
            type: AST_NODE_TYPES.JSXElement,
            openingElement: {
                type: AST_NODE_TYPES.JSXOpeningElement,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "div", ...createMockLocRange() }, // Not an image component
                attributes: [
                    {
                        type: AST_NODE_TYPES.JSXAttribute,
                        name: { type: AST_NODE_TYPES.JSXIdentifier, name: "alt", ...createMockLocRange() },
                        value: { type: AST_NODE_TYPES.Literal, value: "description", raw: '"description"', ...createMockLocRange() },
                        ...createMockLocRange()
                    }
                ],
                selfClosing: false,
                ...createMockLocRange()
            },
            closingElement: null,
            children: [],
            ...createMockLocRange()
        };

        const node: TSESTree.JSXElement = {
            type: AST_NODE_TYPES.JSXElement,
            openingElement: {
                type: AST_NODE_TYPES.JSXOpeningElement,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "Container", ...createMockLocRange() },
                attributes: [],
                selfClosing: false,
                ...createMockLocRange()
            },
            closingElement: null,
            children: [mockDivChild],
            ...createMockLocRange()
        };

        // This should execute line 34 and return false since child is not an image component
        expect(hasLabelledChildImage(node)).toBe(false);
    });
});

describe("isImageHidden - missing coverage for aria-label handling", () => {
    it("covers lines 70-72 - returns false when aria-label has non-empty value", () => {
        // This covers the case where aria-label is present and has a value (lines 70-72)
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "aria-label", ...createMockLocRange() },
                value: {
                    type: AST_NODE_TYPES.Literal,
                    value: "Descriptive label",
                    raw: '"Descriptive label"',
                    ...createMockLocRange()
                },
                ...createMockLocRange()
            }
        ];

        // Should return false because aria-label has a value, meaning image is not hidden
        expect(isImageHidden(attributes)).toBe(false);
    });

    it("covers lines 70-72 - returns false when aria-labelledby has non-empty value", () => {
        // This covers the case where aria-labelledby is present and has a value
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "aria-labelledby", ...createMockLocRange() },
                value: {
                    type: AST_NODE_TYPES.Literal,
                    value: "label-id",
                    raw: '"label-id"',
                    ...createMockLocRange()
                },
                ...createMockLocRange()
            }
        ];

        // Should return false because aria-labelledby has a value, meaning image is not hidden
        expect(isImageHidden(attributes)).toBe(false);
    });

    it("handles case with both aria-label and aria-labelledby present", () => {
        // Additional test to ensure proper handling when both attributes are present
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "aria-label", ...createMockLocRange() },
                value: {
                    type: AST_NODE_TYPES.Literal,
                    value: "Primary label",
                    raw: '"Primary label"',
                    ...createMockLocRange()
                },
                ...createMockLocRange()
            },
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "aria-labelledby", ...createMockLocRange() },
                value: {
                    type: AST_NODE_TYPES.Literal,
                    value: "secondary-label",
                    raw: '"secondary-label"',
                    ...createMockLocRange()
                },
                ...createMockLocRange()
            }
        ];

        // Should return false because aria-label has a value
        expect(isImageHidden(attributes)).toBe(false);
    });
});
