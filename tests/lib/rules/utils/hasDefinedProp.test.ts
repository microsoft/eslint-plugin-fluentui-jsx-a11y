// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESTree } from "@typescript-eslint/utils";
import { getProp, getPropValue, hasProp } from "jsx-ast-utils";
import { hasDefinedProp } from "../../../../lib/util/hasDefinedProp";

// Mocking getProp, getPropValue, and hasProp
jest.mock("jsx-ast-utils", () => ({
    hasProp: jest.fn(),
    getProp: jest.fn(),
    getPropValue: jest.fn()
}));

describe("hasDefinedProp", () => {
    const attributes: TSESTree.JSXOpeningElement["attributes"] = [];
    const propName = "testProp";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return false if the property does not exist", () => {
        (hasProp as jest.Mock).mockReturnValue(false);
        const result = hasDefinedProp(attributes, propName);
        expect(result).toBe(false);
    });

    it("should return false if the property is falsy", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue(null);
        const result = hasDefinedProp(attributes, propName);
        expect(result).toBe(false);
    });

    it("should return false if the property value is undefined", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue(undefined);
        const result = hasDefinedProp(attributes, propName);
        expect(result).toBe(false);
    });

    it("should return false if the property value is null", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue(null);
        const result = hasDefinedProp(attributes, propName);
        expect(result).toBe(false);
    });

    ["non-empty string", "", 1, 0, true, false, [], {}].forEach(value => {
        it(`should return true if the property value is: ${JSON.stringify(value)}`, () => {
            (hasProp as jest.Mock).mockReturnValue(true);
            (getProp as jest.Mock).mockReturnValue({});
            (getPropValue as jest.Mock).mockReturnValue(value);
            const result = hasDefinedProp(attributes, propName);
            expect(result).toBe(true);
        });
    });
});
