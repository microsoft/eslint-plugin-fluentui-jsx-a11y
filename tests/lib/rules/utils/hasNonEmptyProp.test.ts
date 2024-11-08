// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasNonEmptyProp } from "../../../../lib/util/hasNonEmptyProp";
import { TSESTree } from "@typescript-eslint/utils";
import { getProp, getPropValue, hasProp } from "jsx-ast-utils";

// Mocking getProp, getPropValue, and hasProp
jest.mock("jsx-ast-utils", () => ({
    hasProp: jest.fn(),
    getProp: jest.fn(),
    getPropValue: jest.fn()
}));

describe("hasNonEmptyProp", () => {
    const attributes: TSESTree.JSXOpeningElement["attributes"] = [] as any;
    const propName = "testProp";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return false if the property does not exist", () => {
        (hasProp as jest.Mock).mockReturnValue(false);
        expect(hasNonEmptyProp(attributes, propName)).toBe(false);
    });

    it("should return false if the property value is undefined", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue(undefined);
        expect(hasNonEmptyProp(attributes, propName)).toBe(false);
    });

    it("should return false if the property value is null", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue(null);
        expect(hasNonEmptyProp(attributes, propName)).toBe(false);
    });

    it("should return true if the property value is a non-empty string", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue("non-empty string");
        expect(hasNonEmptyProp(attributes, propName)).toBe(true);
    });

    it("should return false if the property value is an empty string", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue(" ");
        expect(hasNonEmptyProp(attributes, propName)).toBe(false);
    });

    it("should return true if the property value is a non-zero number", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue(42);
        expect(hasNonEmptyProp(attributes, propName)).toBe(true);
    });

    it("should return true if the property value is a boolean", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue(true);
        expect(hasNonEmptyProp(attributes, propName)).toBe(true);
    });

    it("should return true if the property value is a non-empty array", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue([1, 2, 3]);
        expect(hasNonEmptyProp(attributes, propName)).toBe(true);
    });

    it("should return false if the property value is an empty array", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue([]);
        expect(hasNonEmptyProp(attributes, propName)).toBe(false);
    });

    it("should return true if the property value is a non-empty object", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue({ key: "value" });
        expect(hasNonEmptyProp(attributes, propName)).toBe(true);
    });

    it("should return false if the property value is an empty object", () => {
        (hasProp as jest.Mock).mockReturnValue(true);
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue({});
        expect(hasNonEmptyProp(attributes, propName)).toBe(false);
    });
});
