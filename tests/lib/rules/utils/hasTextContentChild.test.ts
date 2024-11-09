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

    it("should return false when node.children has no JSXText or relevant JSXExpressionContainer content", () => {
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

    it("should return true when node.children has JSXExpressionContainer with a literal string", () => {
        const node: TSESTree.JSXElement = {
            children: [{ type: "JSXExpressionContainer", expression: { type: "Literal", value: "Hello" } }]
        } as any;
        expect(hasTextContentChild(node)).toBe(true);
    });

    it("should return true when node.children has JSXExpressionContainer with a function call", () => {
        const node: TSESTree.JSXElement = {
            children: [{ type: "JSXExpressionContainer", expression: { type: "CallExpression", callee: { name: "myFunc" } } }]
        } as any;
        expect(hasTextContentChild(node)).toBe(true);
    });

    it("should return true when node.children has JSXExpressionContainer with an identifier (variable)", () => {
        const node: TSESTree.JSXElement = {
            children: [{ type: "JSXExpressionContainer", expression: { type: "Identifier", name: "myVar" } }]
        } as any;
        expect(hasTextContentChild(node)).toBe(true);
    });

    it("should return false when node.children has JSXExpressionContainer with an empty string literal", () => {
        const node: TSESTree.JSXElement = {
            children: [{ type: "JSXExpressionContainer", expression: { type: "Literal", value: "" } }]
        } as any;
        expect(hasTextContentChild(node)).toBe(false);
    });
});
