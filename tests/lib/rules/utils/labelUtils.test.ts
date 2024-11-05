// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isInsideLabelTag } from "../../../../lib/util/labelUtils";

describe("isInsideLabelTag", function () {
    it("should return true when nested within a Label tag", function () {
        const context = {
            getAncestors: () => [
                {
                    type: "JSXElement",
                    openingElement: { name: { name: "Label" } }
                }
                // Other ancestors as needed...
            ]
        };

        const result = isInsideLabelTag(context);

        expect(result).toBe(true);
    });

    it("should return true when nested within a label tag (case-insensitive)", function () {
        const context = {
            getAncestors: () => [
                {
                    type: "JSXElement",
                    openingElement: { name: { name: "label" } }
                }
                // Other ancestors as needed...
            ]
        };

        const result = isInsideLabelTag(context);

        expect(result).toBe(true);
    });

    it("should return false when not nested within a Label tag", function () {
        const context = {
            getAncestors: () => [
                {
                    type: "JSXElement",
                    openingElement: { name: { name: "div" } } // Non-Label element
                }
                // Other ancestors as needed...
            ]
        };

        const result = isInsideLabelTag(context);

        expect(result).toBe(false);
    });
});
