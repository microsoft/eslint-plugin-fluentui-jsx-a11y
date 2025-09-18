// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasLoadingState, getLoadingStateProp } from "../../../lib/util/hasLoadingState";
import { TSESTree } from "@typescript-eslint/utils";

// Mock attributes helper
const createMockAttributes = (props: Record<string, any>): TSESTree.JSXOpeningElement["attributes"] => {
    return Object.entries(props).map(([name, value]) => ({
        type: "JSXAttribute" as const,
        name: {
            type: "JSXIdentifier" as const,
            name,
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: name.length }
            },
            range: [0, name.length]
        },
        value:
            value === true
                ? null
                : {
                      type: "Literal" as const,
                      value,
                      raw: String(value),
                      loc: {
                          start: { line: 1, column: 0 },
                          end: { line: 1, column: String(value).length }
                      },
                      range: [0, String(value).length]
                  },
        loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: name.length + String(value).length }
        },
        range: [0, name.length + String(value).length]
    })) as TSESTree.JSXOpeningElement["attributes"];
};

describe("hasLoadingState", () => {
    test("returns true for loading prop", () => {
        const attributes = createMockAttributes({ loading: true });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns true for isLoading prop", () => {
        const attributes = createMockAttributes({ isLoading: true });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns true for pending prop", () => {
        const attributes = createMockAttributes({ pending: true });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns true for isPending prop", () => {
        const attributes = createMockAttributes({ isPending: true });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns true for busy prop", () => {
        const attributes = createMockAttributes({ busy: true });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns true for isBusy prop", () => {
        const attributes = createMockAttributes({ isBusy: true });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns false for no loading props", () => {
        const attributes = createMockAttributes({ disabled: true });
        expect(hasLoadingState(attributes)).toBe(false);
    });

    test("returns false for empty attributes", () => {
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [];
        expect(hasLoadingState(attributes)).toBe(false);
    });

    test("returns true for multiple loading props", () => {
        const attributes = createMockAttributes({ loading: true, pending: true });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns false for empty string values", () => {
        const attributes = createMockAttributes({ loading: "" });
        expect(hasLoadingState(attributes)).toBe(false);
    });

    test("returns false for null values", () => {
        const attributes = createMockAttributes({ loading: null });
        expect(hasLoadingState(attributes)).toBe(false);
    });

    test("returns false for undefined values", () => {
        const attributes = createMockAttributes({ loading: undefined });
        expect(hasLoadingState(attributes)).toBe(false);
    });

    // Note: false and 0 are considered "non-empty" by hasNonEmptyProp for boolean/number types
    test("returns true for false boolean values", () => {
        const attributes = createMockAttributes({ loading: false });
        expect(hasLoadingState(attributes)).toBe(true);
    });

    test("returns true for zero number values", () => {
        const attributes = createMockAttributes({ loading: 0 });
        expect(hasLoadingState(attributes)).toBe(true);
    });
});

describe("getLoadingStateProp", () => {
    test("returns 'loading' for loading prop", () => {
        const attributes = createMockAttributes({ loading: true });
        expect(getLoadingStateProp(attributes)).toBe("loading");
    });

    test("returns 'isLoading' for isLoading prop", () => {
        const attributes = createMockAttributes({ isLoading: true });
        expect(getLoadingStateProp(attributes)).toBe("isLoading");
    });

    test("returns 'pending' for pending prop", () => {
        const attributes = createMockAttributes({ pending: true });
        expect(getLoadingStateProp(attributes)).toBe("pending");
    });

    test("returns 'isPending' for isPending prop", () => {
        const attributes = createMockAttributes({ isPending: true });
        expect(getLoadingStateProp(attributes)).toBe("isPending");
    });

    test("returns 'busy' for busy prop", () => {
        const attributes = createMockAttributes({ busy: true });
        expect(getLoadingStateProp(attributes)).toBe("busy");
    });

    test("returns 'isBusy' for isBusy prop", () => {
        const attributes = createMockAttributes({ isBusy: true });
        expect(getLoadingStateProp(attributes)).toBe("isBusy");
    });

    test("returns null for no loading props", () => {
        const attributes = createMockAttributes({ disabled: true });
        expect(getLoadingStateProp(attributes)).toBe(null);
    });

    test("returns null for empty attributes", () => {
        const attributes: TSESTree.JSXOpeningElement["attributes"] = [];
        expect(getLoadingStateProp(attributes)).toBe(null);
    });

    test("returns first found loading prop when multiple present", () => {
        const attributes = createMockAttributes({ pending: true, loading: true });
        // Should return 'loading' as it comes first in LOADING_STATE_PROPS array
        expect(getLoadingStateProp(attributes)).toBe("loading");
    });

    test("returns first found loading prop in priority order", () => {
        const attributes = createMockAttributes({ isBusy: true, pending: true, loading: true });
        // Should return 'loading' as it has highest priority in LOADING_STATE_PROPS array
        expect(getLoadingStateProp(attributes)).toBe("loading");
    });

    test("returns null for empty string values", () => {
        const attributes = createMockAttributes({ loading: "" });
        expect(getLoadingStateProp(attributes)).toBe(null);
    });

    test("returns null for null values", () => {
        const attributes = createMockAttributes({ loading: null });
        expect(getLoadingStateProp(attributes)).toBe(null);
    });

    test("returns null for undefined values", () => {
        const attributes = createMockAttributes({ loading: undefined });
        expect(getLoadingStateProp(attributes)).toBe(null);
    });

    // Note: hasNonEmptyProp considers false and 0 as "non-empty" for boolean/number types
    test("returns prop name for false boolean values", () => {
        const attributes = createMockAttributes({ loading: false });
        expect(getLoadingStateProp(attributes)).toBe("loading");
    });

    test("returns prop name for truthy number values", () => {
        const attributes = createMockAttributes({ loading: 1 });
        expect(getLoadingStateProp(attributes)).toBe("loading");
    });

    test("returns prop name for zero number values", () => {
        const attributes = createMockAttributes({ loading: 0 });
        expect(getLoadingStateProp(attributes)).toBe("loading");
    });
});
