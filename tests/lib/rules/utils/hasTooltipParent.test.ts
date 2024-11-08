// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasToolTipParent } from "../../../../lib/util/hasTooltipParent";
import { TSESLint } from "@typescript-eslint/utils";

// Mocking the elementType utility
jest.mock("jsx-ast-utils", () => ({
    elementType: (openingElement: any) => openingElement.name.name
}));

describe("hasToolTipParent", () => {
    let mockContext: TSESLint.RuleContext<string, unknown[]>;

    beforeEach(() => {
        mockContext = {
            getAncestors: jest.fn()
        } as unknown as TSESLint.RuleContext<string, unknown[]>;
    });

    test("should return false when there are no ancestors", () => {
        (mockContext.getAncestors as jest.Mock).mockReturnValue([]);

        const result = hasToolTipParent(mockContext);
        expect(result).toBe(false);
    });

    test("should return false when no Tooltip ancestor exists", () => {
        const mockAncestors = [
            {
                type: "JSXElement",
                openingElement: {
                    type: "JSXOpeningElement",
                    name: { name: "Button" } // Not a Tooltip
                }
            },
            {
                type: "JSXElement",
                openingElement: {
                    type: "JSXOpeningElement",
                    name: { name: "Div" } // Not a Tooltip
                }
            }
        ];
        (mockContext.getAncestors as jest.Mock).mockReturnValue(mockAncestors);

        const result = hasToolTipParent(mockContext);
        expect(result).toBe(false);
    });

    test("should return true when a Tooltip ancestor exists", () => {
        const mockAncestors = [
            {
                type: "JSXElement",
                openingElement: {
                    type: "JSXOpeningElement",
                    name: { name: "Div" } // Not a Tooltip
                }
            },
            {
                type: "JSXElement",
                openingElement: {
                    type: "JSXOpeningElement",
                    name: { name: "Tooltip" } // This is a Tooltip
                }
            }
        ];
        (mockContext.getAncestors as jest.Mock).mockReturnValue(mockAncestors);

        const result = hasToolTipParent(mockContext);
        expect(result).toBe(true);
    });
});
