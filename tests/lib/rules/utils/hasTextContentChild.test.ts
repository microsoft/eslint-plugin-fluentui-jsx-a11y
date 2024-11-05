// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasTextContentChild } from "../../../../lib/util/hasTextContentChild";
import { TSESTree } from "@typescript-eslint/types";

describe("hasTextContentChild", () => {
    it("should return false when node is undefined", () => {
        expect(hasTextContentChild(undefined)).toBe(false);
    });

    it("should return false when node.children is null or undefined", () => {
        const node: TSESTree.JSXElement = { children: null } as any;
        expect(hasTextContentChild(node)).toBe(false);

        const nodeUndefinedChildren: TSESTree.JSXElement = { children: undefined } as any;
        expect(hasTextContentChild(nodeUndefinedChildren)).toBe(false);
    });

    it("should return false when node.children is an empty array", () => {
        const node: TSESTree.JSXElement = { children: [] } as any;
        expect(hasTextContentChild(node)).toBe(false);
    });

    it("should return false when node.children has no JSXText elements with non-whitespace content", () => {
        const node: TSESTree.JSXElement = {
            children: [{ type: "JSXElement" }, { type: "JSXExpressionContainer" }]
        } as any;
        expect(hasTextContentChild(node)).toBe(false);
    });

    it("should return true when node.children has at least one JSXText element with non-whitespace content", () => {
        const node: TSESTree.JSXElement = {
            children: [{ type: "JSXText", value: "Hello" }, { type: "JSXElement" }]
        } as any;
        expect(hasTextContentChild(node)).toBe(true);
    });

    it("should return false when node.children has only whitespace in JSXText elements", () => {
        const node: TSESTree.JSXElement = {
            children: [{ type: "JSXText", value: "   " }]
        } as any;
        expect(hasTextContentChild(node)).toBe(false);
    });
});
