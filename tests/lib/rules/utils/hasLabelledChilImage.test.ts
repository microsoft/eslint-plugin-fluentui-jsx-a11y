// Import necessary dependencies and mock functions
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
