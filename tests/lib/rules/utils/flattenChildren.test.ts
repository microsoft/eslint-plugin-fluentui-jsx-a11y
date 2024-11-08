// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { flattenChildren } from "../../../../lib/util/flattenChildren";
import { TSESTree } from "@typescript-eslint/types";

describe("flattenChildren", () => {
    it("should return an empty array when there are no children", () => {
        const node: TSESTree.JSXElement = {
            children: []
        } as any;
        expect(flattenChildren(node)).toEqual([]);
    });

    it("should return direct children when there are no nested children", () => {
        const child1: TSESTree.JSXElement = { children: [], type: "JSXElement" } as any;
        const child2: TSESTree.JSXElement = { children: [], type: "JSXElement" } as any;
        const node: TSESTree.JSXElement = {
            children: [child1, child2]
        } as any;

        expect(flattenChildren(node)).toEqual([child1, child2]);
    });

    it("should return a flattened array of children with nested JSXElements", () => {
        const nestedChild: TSESTree.JSXElement = { children: [], type: "JSXElement" } as any;
        const child: TSESTree.JSXElement = { children: [nestedChild], type: "JSXElement" } as any;
        const root: TSESTree.JSXElement = { children: [child], type: "JSXElement" } as any;

        expect(flattenChildren(root)).toEqual([child, nestedChild]);
    });

    it("should ignore non-JSXElement children", () => {
        const child: TSESTree.JSXElement = { children: [], type: "JSXElement" } as any;
        const nonJSXChild = { type: "JSXText", value: "Hello" } as any;
        const root: TSESTree.JSXElement = { children: [child, nonJSXChild], type: "JSXElement" } as any;

        expect(flattenChildren(root)).toEqual([child]);
    });

    it("should handle complex nesting of JSXElements", () => {
        const grandchild1: TSESTree.JSXElement = { children: [], type: "JSXElement" } as any;
        const grandchild2: TSESTree.JSXElement = { children: [], type: "JSXElement" } as any;
        const child1: TSESTree.JSXElement = { children: [grandchild1], type: "JSXElement" } as any;
        const child2: TSESTree.JSXElement = { children: [grandchild2], type: "JSXElement" } as any;
        const root: TSESTree.JSXElement = { children: [child1, child2], type: "JSXElement" } as any;

        expect(flattenChildren(root)).toEqual([child1, grandchild1, child2, grandchild2]);
    });
});
