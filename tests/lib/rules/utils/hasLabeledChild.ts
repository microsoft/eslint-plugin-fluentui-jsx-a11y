// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import { hasLabeledChild } from "../../../../lib/util/hasLabeledChild";

// helper for loc/range
const mockLocRange = () => ({
    loc: {
        start: { line: 0, column: 0 },
        end: { line: 0, column: 0 }
    },
    range: [0, 0] as [number, number]
});

// minimal JSXOpeningElement: <img />
const openingEl: TSESTree.JSXOpeningElement = {
    type: AST_NODE_TYPES.JSXOpeningElement,
    name: {
        type: AST_NODE_TYPES.JSXIdentifier,
        name: "img",
        ...mockLocRange()
    },
    attributes: [], // no props
    selfClosing: true, // <img />
    ...mockLocRange()
};

// minimal RuleContext mock
const mockContext = {
    report: jest.fn(),
    getSourceCode: jest.fn()
} as unknown as TSESLint.RuleContext<string, unknown[]>;

describe("hasLabeledChild", () => {
    it("returns false for a self-closing <img /> with no labeled children", () => {
        expect(hasLabeledChild(openingEl, mockContext)).toBe(false);
    });
});
