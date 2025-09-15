// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasFieldParent } from "../../../../lib/util/hasFieldParent";
import { TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import { elementType } from "jsx-ast-utils";

// Mock the elementType function to return "Field" when needed
jest.mock("jsx-ast-utils", () => ({
    elementType: jest.fn()
}));

// Mock context to simulate ESLint's RuleContext
const createMockContext = (ancestors: TSESTree.Node[]): TSESLint.RuleContext<string, []> => ({
    // Mock the required properties of RuleContext
    id: "mockRule",
    options: [],
    settings: {},
    parserPath: "",
    parserOptions: {},
    getCwd: jest.fn(),
    getFilename: jest.fn(() => "mockFile.js"),
    getScope: jest.fn(),
    report: jest.fn(),
    getAncestors: () => ancestors,
    getSourceCode: jest.fn(),
    // eslint-disable-next-line no-unused-vars
    getDeclaredVariables: function (node: TSESTree.Node): readonly TSESLint.Scope.Variable[] {
        throw new Error("Function not implemented.");
    },
    // eslint-disable-next-line no-unused-vars
    markVariableAsUsed: function (name: string): boolean {
        throw new Error("Function not implemented.");
    }
});

describe("hasFieldParent", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should return false when there are no ancestors", () => {
        const mockContext = createMockContext([]);
        const result = hasFieldParent(mockContext);
        expect(result).toBe(false);
    });

    test("should return false when there are ancestors but none are JSXElements", () => {
        const mockContext = createMockContext([{ type: "Literal" } as TSESTree.Literal]);
        const result = hasFieldParent(mockContext);
        expect(result).toBe(false);
    });

    test('should return false when none of the ancestors are "Field" elements', () => {
        const mockContext = createMockContext([
            {
                type: "JSXElement",
                openingElement: { type: "JSXOpeningElement" }
            } as TSESTree.JSXElement
        ]);
        (elementType as jest.Mock).mockReturnValue("NotAField");
        const result = hasFieldParent(mockContext);
        expect(result).toBe(false);
    });

    test('should return true when one of the ancestors is a "Field" element', () => {
        const mockContext = createMockContext([
            {
                type: "JSXElement",
                openingElement: { type: "JSXOpeningElement" }
            } as TSESTree.JSXElement
        ]);
        (elementType as jest.Mock).mockReturnValue("Field");
        const result = hasFieldParent(mockContext);
        expect(result).toBe(true);
    });

    test('should handle multiple ancestors with one "Field" element', () => {
        const mockContext = createMockContext([
            { type: "JSXElement", openingElement: { type: "JSXOpeningElement" } } as TSESTree.JSXElement,
            { type: "Literal" } as TSESTree.Literal,
            { type: "JSXElement", openingElement: { type: "JSXOpeningElement" } } as TSESTree.JSXElement
        ]);
        (elementType as jest.Mock).mockReturnValueOnce("NotAField").mockReturnValueOnce("Field");
        const result = hasFieldParent(mockContext);
        expect(result).toBe(true);
    });
});
