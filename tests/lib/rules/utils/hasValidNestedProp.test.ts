// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

jest.mock("jsx-ast-utils", () => ({
    getProp: jest.fn(),
    getPropValue: jest.fn()
}));

import { getProp, getPropValue } from "jsx-ast-utils";
import { hasValidNestedProp } from "../../../../lib/util/hasValidNestedProp";

describe("hasValidNestedProp", () => {
    const opening = { attributes: [] } as any;

    beforeEach(() => {
        (getProp as jest.Mock).mockReset();
        (getPropValue as jest.Mock).mockReset();
    });

    test("returns false when the prop is not present (e.g. <Tag />)", () => {
        // Example: <Tag />
        (getProp as jest.Mock).mockReturnValue(undefined);
        const result = hasValidNestedProp(opening, "dismissIcon", "aria-label");
        expect(result).toBe(false);
        expect(getProp).toHaveBeenCalledWith(opening.attributes, "dismissIcon");
    });

    test("returns false when nested key is missing or empty string", () => {
        // Example: <Tag dismissIcon={{}} />
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue({});
        expect(hasValidNestedProp(opening, "dismissIcon", "aria-label")).toBe(false);

        // Example: <Tag dismissIcon={{ "aria-label": "   " }} />
        (getPropValue as jest.Mock).mockReturnValue({ "aria-label": "   " });
        expect(hasValidNestedProp(opening, "dismissIcon", "aria-label")).toBe(false);
    });

    test("returns true when nested key is a non-empty string (e.g. <Tag dismissIcon={{ 'aria-label': 'Dismiss' }} />)", () => {
        // Example: <Tag dismissIcon={{ "aria-label": "Dismiss" }} />
        (getProp as jest.Mock).mockReturnValue({});
        (getPropValue as jest.Mock).mockReturnValue({ "aria-label": "Dismiss" });
        expect(hasValidNestedProp(opening, "dismissIcon", "aria-label")).toBe(true);
    });
});
