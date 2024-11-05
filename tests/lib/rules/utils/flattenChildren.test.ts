import { flattenChildren } from "../../../../lib/util/flattenChildren";
import { TSESTree } from "@typescript-eslint/types";

describe("flattenChildren", () => {
    test("should return an empty array when node has no children", () => {
        const node: TSESTree.JSXElement = {
            type: "JSXElement",
            openingElement: {} as TSESTree.JSXOpeningElement,
            closingElement: null,
            children: []
        };
        const result = flattenChildren(node);
        expect(result).toEqual([]);
    });

    test("should return the same array when node has no nested JSXElement children", () => {
        const node: TSESTree.JSXElement = {
            type: "JSXElement",
            openingElement: {} as TSESTree.JSXOpeningElement,
            closingElement: null,
            children: [
                { type: "JSXText", value: "Hello" } as TSESTree.JSXText,
                { type: "JSXExpressionContainer" } as TSESTree.JSXExpressionContainer
            ]
        };
        const result = flattenChildren(node);
        expect(result).toEqual([]);
    });

    test("should flatten nested JSXElement children", () => {
        const node: TSESTree.JSXElement = {
            type: "JSXElement",
            openingElement: {} as TSESTree.JSXOpeningElement,
            closingElement: null,
            children: [
                {
                    type: "JSXElement",
                    openingElement: {} as TSESTree.JSXOpeningElement,
                    closingElement: null,
                    children: [{ type: "JSXText", value: "Nested" } as TSESTree.JSXText]
                } as TSESTree.JSXElement
            ]
        };
        const result = flattenChildren(node);
        expect(result).toEqual([node.children[0], { type: "JSXText", value: "Nested" }]);
    });

    test("should handle mixed nested and non-nested JSXElement children", () => {
        const node: TSESTree.JSXElement = {
            type: "JSXElement",
            openingElement: {} as TSESTree.JSXOpeningElement,
            closingElement: null,
            children: [
                {
                    type: "JSXElement",
                    openingElement: {} as TSESTree.JSXOpeningElement,
                    closingElement: null,
                    children: [
                        { type: "JSXText", value: "Text" } as TSESTree.JSXText,
                        {
                            type: "JSXElement",
                            openingElement: {} as TSESTree.JSXOpeningElement,
                            closingElement: null,
                            children: []
                        } as TSESTree.JSXElement
                    ]
                } as TSESTree.JSXElement
            ]
        };
        const result = flattenChildren(node);
        expect(result).toEqual([node.children[0], { type: "JSXText", value: "Text" }, node.children[0].children[1]]);
    });
});
