// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import { hasLabeledChild } from "../../../../lib/util/hasLabeledChild";

// Helper for creating mock loc/range objects
const mockLocRange = () => ({
    loc: {
        start: { line: 0, column: 0 },
        end: { line: 0, column: 0 }
    },
    range: [0, 0] as [number, number]
});

// Mock context helper
const mockContext = (sourceText = ""): TSESLint.RuleContext<string, unknown[]> => {
    return {
        getSourceCode: () => ({
            getText: () => sourceText,
            text: sourceText
        })
    } as unknown as TSESLint.RuleContext<string, unknown[]>;
};

// Helper to create JSX attributes
const createJSXAttribute = (name: string, value?: string | number): TSESTree.JSXAttribute => ({
    type: AST_NODE_TYPES.JSXAttribute,
    name: {
        type: AST_NODE_TYPES.JSXIdentifier,
        name,
        ...mockLocRange()
    },
    value:
        value !== undefined
            ? {
                  type: AST_NODE_TYPES.Literal,
                  value,
                  raw: typeof value === "string" ? `"${value}"` : String(value),
                  ...mockLocRange()
              }
            : null,
    ...mockLocRange()
});

// Helper to create JSX opening element
const createJSXOpeningElement = (tagName: string, attributes: TSESTree.JSXAttribute[] = []): TSESTree.JSXOpeningElement => ({
    type: AST_NODE_TYPES.JSXOpeningElement,
    name: {
        type: AST_NODE_TYPES.JSXIdentifier,
        name: tagName,
        ...mockLocRange()
    },
    attributes,
    selfClosing: false,
    ...mockLocRange()
});

// Helper to create JSX element
const createJSXElement = (
    tagName: string,
    attributes: TSESTree.JSXAttribute[] = [],
    children: (TSESTree.JSXElement | TSESTree.JSXText | TSESTree.JSXExpressionContainer)[] = []
): TSESTree.JSXElement => ({
    type: AST_NODE_TYPES.JSXElement,
    openingElement: createJSXOpeningElement(tagName, attributes),
    closingElement: {
        type: AST_NODE_TYPES.JSXClosingElement,
        name: {
            type: AST_NODE_TYPES.JSXIdentifier,
            name: tagName,
            ...mockLocRange()
        },
        ...mockLocRange()
    },
    children,
    ...mockLocRange()
});

// Helper to create opening element with parent context
const createOpeningElementWithParent = (tagName: string, children: TSESTree.JSXElement[] = []): TSESTree.JSXOpeningElement => {
    const parentElement = createJSXElement("Container", [], children);
    const openingElement = createJSXOpeningElement(tagName);
    openingElement.parent = parentElement;
    return openingElement;
};

describe("hasLabeledChild", () => {
    const defaultContext = mockContext();

    describe("Basic functionality", () => {
        it("returns false when node has no parent", () => {
            const openingElement = createJSXOpeningElement("Button");
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false when parent has no children", () => {
            const openingElement = createOpeningElementWithParent("Button", []);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false when parent children is null", () => {
            const openingElement = createJSXOpeningElement("Button");
            const parentElement = createJSXElement("Container");
            parentElement.children = null as any;
            openingElement.parent = parentElement;
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false when parent children is undefined", () => {
            const openingElement = createJSXOpeningElement("Button");
            const parentElement = createJSXElement("Container");
            parentElement.children = undefined as any;
            openingElement.parent = parentElement;
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });
    });

    describe("Image elements with alt text", () => {
        it("returns true for img with alt attribute", () => {
            const imgChild = createJSXElement("img", [createJSXAttribute("alt", "User profile")]);
            const openingElement = createOpeningElementWithParent("Button", [imgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for Image component with alt attribute", () => {
            const imageChild = createJSXElement("Image", [createJSXAttribute("alt", "Product photo")]);
            const openingElement = createOpeningElementWithParent("Card", [imageChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns false for img without alt attribute", () => {
            const imgChild = createJSXElement("img", [createJSXAttribute("src", "photo.jpg")]);
            const openingElement = createOpeningElementWithParent("Button", [imgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false for img with empty alt attribute", () => {
            const imgChild = createJSXElement("img", [createJSXAttribute("alt", "")]);
            const openingElement = createOpeningElementWithParent("Button", [imgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });
    });

    describe("SVG elements", () => {
        it("returns true for svg with title attribute", () => {
            const svgChild = createJSXElement("svg", [createJSXAttribute("title", "Close icon")]);
            const openingElement = createOpeningElementWithParent("Button", [svgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for svg with aria-label", () => {
            const svgChild = createJSXElement("svg", [createJSXAttribute("aria-label", "Menu icon")]);
            const openingElement = createOpeningElementWithParent("MenuButton", [svgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for svg with aria-labelledby that references existing element", () => {
            const svgChild = createJSXElement("svg", [createJSXAttribute("aria-labelledby", "icon-label")]);
            const openingElement = createOpeningElementWithParent("Button", [svgChild]);
            const contextWithLabel = mockContext('<Label id="icon-label">Close Icon</Label>');
            expect(hasLabeledChild(openingElement, contextWithLabel)).toBe(true);
        });

        it("returns false for svg with aria-labelledby that references non-existing element", () => {
            const svgChild = createJSXElement("svg", [createJSXAttribute("aria-labelledby", "non-existing")]);
            const openingElement = createOpeningElementWithParent("Button", [svgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false for svg without accessible attributes", () => {
            const svgChild = createJSXElement("svg", [createJSXAttribute("viewBox", "0 0 24 24")]);
            const openingElement = createOpeningElementWithParent("Button", [svgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false for svg with empty title", () => {
            const svgChild = createJSXElement("svg", [createJSXAttribute("title", "")]);
            const openingElement = createOpeningElementWithParent("Button", [svgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });
    });

    describe("Elements with role='img'", () => {
        it("returns true for element with role='img' and aria-label", () => {
            const spanChild = createJSXElement("span", [
                createJSXAttribute("role", "img"),
                createJSXAttribute("aria-label", "Celebration emoji")
            ]);
            const openingElement = createOpeningElementWithParent("Button", [spanChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for element with role='img' and aria-labelledby that references existing element", () => {
            const divChild = createJSXElement("div", [
                createJSXAttribute("role", "img"),
                createJSXAttribute("aria-labelledby", "emoji-label")
            ]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            const contextWithLabel = mockContext('<div id="emoji-label">Emoji Description</div>');
            expect(hasLabeledChild(openingElement, contextWithLabel)).toBe(true);
        });

        it("returns false for element with role='img' and aria-labelledby that references non-existing element", () => {
            const divChild = createJSXElement("div", [
                createJSXAttribute("role", "img"),
                createJSXAttribute("aria-labelledby", "non-existing")
            ]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false for element with role='img' but no aria-label", () => {
            const spanChild = createJSXElement("span", [createJSXAttribute("role", "img")]);
            const openingElement = createOpeningElementWithParent("Button", [spanChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns true for element with different role but aria-label", () => {
            // Any element with aria-label should return true, regardless of role
            const spanChild = createJSXElement("span", [
                createJSXAttribute("role", "button"),
                createJSXAttribute("aria-label", "Click me")
            ]);
            const openingElement = createOpeningElementWithParent("Container", [spanChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns false for element with different role and no accessible labeling", () => {
            const spanChild = createJSXElement("span", [
                createJSXAttribute("role", "button"),
                createJSXAttribute("className", "my-button")
            ]);
            const openingElement = createOpeningElementWithParent("Container", [spanChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns true for element with different role but aria-labelledby reference", () => {
            const spanChild = createJSXElement("span", [
                createJSXAttribute("role", "button"),
                createJSXAttribute("aria-labelledby", "existingLabel")
            ]);
            const openingElement = createOpeningElementWithParent("Container", [spanChild]);
            const contextWithLabel = mockContext('<Label id="existingLabel">Button Label</Label>');
            expect(hasLabeledChild(openingElement, contextWithLabel)).toBe(true);
        });
    });

    describe("FluentUI Icon components", () => {
        it("returns true for elements with 'icon' in name", () => {
            const iconChild = createJSXElement("CloseIcon");
            const openingElement = createOpeningElementWithParent("Button", [iconChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for Icon component", () => {
            const iconChild = createJSXElement("Icon");
            const openingElement = createOpeningElementWithParent("MenuButton", [iconChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for custom icon components", () => {
            const iconChild = createJSXElement("MyCustomIcon");
            const openingElement = createOpeningElementWithParent("Button", [iconChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });
    });

    describe("Elements with aria-label or title", () => {
        it("returns true for any element with aria-label", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-label", "Status indicator")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for any element with title", () => {
            const spanChild = createJSXElement("span", [createJSXAttribute("title", "Tooltip text")]);
            const openingElement = createOpeningElementWithParent("Button", [spanChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true for any element with aria-labelledby that references existing element", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-labelledby", "status-label")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            const contextWithLabel = mockContext('<Label id="status-label">Current Status</Label>');
            expect(hasLabeledChild(openingElement, contextWithLabel)).toBe(true);
        });

        it("returns false for element with aria-labelledby that references non-existing element", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-labelledby", "non-existing")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false for element with empty aria-label", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-label", "")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("returns false for element with empty title", () => {
            const spanChild = createJSXElement("span", [createJSXAttribute("title", "")]);
            const openingElement = createOpeningElementWithParent("Button", [spanChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });
    });

    describe("Complex nested structures", () => {
        it("returns true when labeled child is nested deeply", () => {
            const nestedImg = createJSXElement("img", [createJSXAttribute("alt", "Deep nested image")]);
            const nestedDiv = createJSXElement("div", [], [nestedImg]);
            const containerDiv = createJSXElement("div", [], [nestedDiv]);
            const openingElement = createOpeningElementWithParent("Card", [containerDiv]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns true when any of multiple children has labels", () => {
            const unlabeledDiv = createJSXElement("div");
            const labeledIcon = createJSXElement("SaveIcon");
            const unlabeledSpan = createJSXElement("span");
            const openingElement = createOpeningElementWithParent("Button", [unlabeledDiv, labeledIcon, unlabeledSpan]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("returns false when multiple children exist but none are labeled", () => {
            const unlabeledDiv = createJSXElement("div");
            const unlabeledSpan = createJSXElement("span", [createJSXAttribute("className", "text")]);
            const unlabeledImg = createJSXElement("img", [createJSXAttribute("src", "photo.jpg")]);
            const openingElement = createOpeningElementWithParent("Button", [unlabeledDiv, unlabeledSpan, unlabeledImg]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });
    });

    describe("Edge cases and error handling", () => {
        it("handles malformed JSX gracefully", () => {
            const openingElement = createJSXOpeningElement("Button");
            const malformedParent = {
                type: AST_NODE_TYPES.JSXElement,
                openingElement: createJSXOpeningElement("Container"),
                closingElement: {
                    type: AST_NODE_TYPES.JSXClosingElement,
                    name: {
                        type: AST_NODE_TYPES.JSXIdentifier,
                        name: "Container",
                        ...mockLocRange()
                    },
                    ...mockLocRange()
                },
                children: "not an array" as any,
                ...mockLocRange()
            } as TSESTree.JSXElement;
            openingElement.parent = malformedParent;
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("handles non-JSXElement children gracefully", () => {
            const openingElement = createJSXOpeningElement("Button");
            const parentElement = createJSXElement("Container");
            parentElement.children = [
                { type: AST_NODE_TYPES.JSXText, value: "text" } as any,
                { type: AST_NODE_TYPES.JSXExpressionContainer } as any
            ];
            openingElement.parent = parentElement;
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("handles elements with non-JSXIdentifier names", () => {
            const openingElement = createJSXOpeningElement("Button");
            const parentElement = createJSXElement("Container");
            const childWithComplexName = {
                type: AST_NODE_TYPES.JSXElement,
                openingElement: {
                    type: AST_NODE_TYPES.JSXOpeningElement,
                    name: {
                        type: AST_NODE_TYPES.JSXMemberExpression,
                        object: { type: AST_NODE_TYPES.JSXIdentifier, name: "React" },
                        property: { type: AST_NODE_TYPES.JSXIdentifier, name: "Fragment" }
                    } as any,
                    attributes: [],
                    ...mockLocRange()
                },
                closingElement: {
                    type: AST_NODE_TYPES.JSXClosingElement,
                    name: {
                        type: AST_NODE_TYPES.JSXMemberExpression,
                        object: { type: AST_NODE_TYPES.JSXIdentifier, name: "React" },
                        property: { type: AST_NODE_TYPES.JSXIdentifier, name: "Fragment" }
                    } as any,
                    ...mockLocRange()
                },
                children: [],
                ...mockLocRange()
            } as unknown as TSESTree.JSXElement;
            parentElement.children = [childWithComplexName];
            openingElement.parent = parentElement;
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("handles attribute parsing errors gracefully", () => {
            const openingElement = createJSXOpeningElement("Button");
            const parentElement = createJSXElement("Container");
            const childWithMalformedAttrs = createJSXElement("img");
            childWithMalformedAttrs.openingElement.attributes = "not an array" as any;
            parentElement.children = [childWithMalformedAttrs];
            openingElement.parent = parentElement;
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(false);
        });

        it("handles context parsing errors gracefully", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-labelledby", "some-id")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            const malformedContext = {
                getSourceCode: () => {
                    throw new Error("Source code not available");
                }
            } as unknown as TSESLint.RuleContext<string, unknown[]>;
            expect(hasLabeledChild(openingElement, malformedContext)).toBe(false);
        });
    });

    describe("Case sensitivity", () => {
        it("handles uppercase IMG elements", () => {
            const imgChild = createJSXElement("IMG", [createJSXAttribute("alt", "Uppercase image")]);
            const openingElement = createOpeningElementWithParent("Button", [imgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("handles mixed case SVG elements", () => {
            const svgChild = createJSXElement("SVG", [createJSXAttribute("title", "Mixed case SVG")]);
            const openingElement = createOpeningElementWithParent("Button", [svgChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });

        it("handles uppercase ICON in component names", () => {
            const iconChild = createJSXElement("CLOSEICON");
            const openingElement = createOpeningElementWithParent("Button", [iconChild]);
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });
    });

    describe("Integration with rule factory", () => {
        it("integrates correctly with makeLabeledControlRule", () => {
            // This test ensures the function works as expected when called from the rule factory
            const imgChild = createJSXElement("img", [createJSXAttribute("alt", "Integration test")]);
            const openingElement = createOpeningElementWithParent("Button", [imgChild]);

            // Simulate the call from hasAccessibleLabel in ruleFactory
            expect(hasLabeledChild(openingElement, defaultContext)).toBe(true);
        });
    });

    describe("aria-labelledby validation with context", () => {
        it("validates multiple id references in aria-labelledby", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-labelledby", "label1 label2")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            const contextWithMultipleLabels = mockContext('<Label id="label1">First</Label><div id="label2">Second</div>');
            expect(hasLabeledChild(openingElement, contextWithMultipleLabels)).toBe(true);
        });

        it("returns true when at least one id reference exists (accessibility best practice)", () => {
            // This is correct behavior: if at least one reference exists, the element has accessible labeling
            const divChild = createJSXElement("div", [createJSXAttribute("aria-labelledby", "exists missing")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            const contextWithPartialLabels = mockContext('<Label id="exists">Exists</Label>');
            expect(hasLabeledChild(openingElement, contextWithPartialLabels)).toBe(true);
        });

        it("returns false when no id references exist", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-labelledby", "missing1 missing2")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            const contextWithNoLabels = mockContext('<Label id="other">Other Label</Label>');
            expect(hasLabeledChild(openingElement, contextWithNoLabels)).toBe(false);
        });

        it("handles expression-based aria-labelledby references", () => {
            const divChild = createJSXElement("div", [createJSXAttribute("aria-labelledby", "dynamic-id")]);
            const openingElement = createOpeningElementWithParent("Card", [divChild]);
            const contextWithExpressionLabel = mockContext('<Label id={"dynamic-id"}>Dynamic Label</Label>');
            expect(hasLabeledChild(openingElement, contextWithExpressionLabel)).toBe(true);
        });
    });
});
