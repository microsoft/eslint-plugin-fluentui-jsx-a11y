// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasAssociatedLabelViaAriaLabelledBy, hasAssociatedLabelViaAriaDescribedby } from "../../../../lib/util/labelUtils";

import { TSESTree, TSESLint, AST_NODE_TYPES } from "@typescript-eslint/utils"; // Use TSESTree types consistently

describe("labelUtils", () => {
    // Mock context with getSourceCode method
    const mockContext = (): TSESLint.RuleContext<string, unknown[]> => {
        return {
            getSourceCode: () => ({
                getText: () => "mocked text"
            })
        } as unknown as TSESLint.RuleContext<string, unknown[]>;
    };
    // Define the test suite
    describe("hasAssociatedLabelViaAriaLabelledBy", () => {
        let context: TSESLint.RuleContext<string, unknown[]>;
        let openingElement: TSESTree.JSXOpeningElement;

        beforeEach(() => {
            context = mockContext();
            openingElement = {
                attributes: []
            } as unknown as TSESTree.JSXOpeningElement;
        });

        function createJSXAttribute(name: string, value: string | number | null): TSESTree.JSXAttribute {
            return {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name } as TSESTree.JSXIdentifier,
                value: value !== null ? ({ type: AST_NODE_TYPES.Literal, value } as TSESTree.Literal) : null,
                loc: {} as TSESTree.SourceLocation,
                range: [0, 0]
            };
        }

        test("returns false if aria-labelledby is missing", () => {
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-labelledby is empty", () => {
            openingElement.attributes = [createJSXAttribute("aria-labelledby", "")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-labelledby value is not a string", () => {
            openingElement.attributes = [createJSXAttribute("aria-labelledby", 123)];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if referenced element by id does not exist", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<Label id='existing-label-id'>Test Label</Label>",
                    text: () => "<Label id='existing-label-id'>Test Label</Label>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-labelledby", "non-existing-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(false);
        });

        test("returns true if aria-labelledby references an existing label element", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<Label id='existing-label-id'>Test Label</Label>",
                    text: () => "<Label id='existing-label-id'>Test Label</Label>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-labelledby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-labelledby references an existing label element without duplicates", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<Label id='existing-label-id'>Test Label</Label><Label id='existing-label-id-2'>Test Label</Label>",
                    text: () => "<Label id='existing-label-id'>Test Label</Label>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-labelledby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-labelledby references an existing non-label element", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<div id='existing-non-label-id'>Test Label</div>",
                    text: () => "<div id='existing-non-label-id'>Test Label</div>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-labelledby", "existing-non-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-labelledby references both label and non-label elements", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<h2 id='existing-label-id'>Test Label</h2>",
                    text: () => "<h2 id='existing-label-id'>Test Label</h2>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-labelledby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });
    });

    describe("hasAssociatedLabelViaAriaDescribedby", () => {
        let context: TSESLint.RuleContext<string, unknown[]>;
        let openingElement: TSESTree.JSXOpeningElement;

        beforeEach(() => {
            context = mockContext();
            openingElement = {
                attributes: []
            } as unknown as TSESTree.JSXOpeningElement;
        });

        function createJSXAttribute(name: string, value: string | number | null): TSESTree.JSXAttribute {
            return {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name } as TSESTree.JSXIdentifier,
                value: value !== null ? ({ type: AST_NODE_TYPES.Literal, value } as TSESTree.Literal) : null,
                loc: {} as TSESTree.SourceLocation,
                range: [0, 0]
            };
        }

        test("returns false if aria-describedby is missing", () => {
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-describedby is empty", () => {
            openingElement.attributes = [createJSXAttribute("aria-describedby", "")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-describedby value is not a string", () => {
            openingElement.attributes = [createJSXAttribute("aria-describedby", 123)];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if referenced element by id does not exist", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<Label id='existing-label-id'>Test Label</Label>",
                    text: () => "<Label id='existing-label-id'>Test Label</Label>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-describedby", "non-existing-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(false);
        });

        test("returns true if aria-describedby references an existing label element", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<Label id='existing-label-id'>Test Label</Label>",
                    text: () => "<Label id='existing-label-id'>Test Label</Label>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-describedby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-describedby references an existing non-label element", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<div id='existing-non-label-id'>Test Label</div>",
                    text: () => "<div id='existing-non-label-id'>Test Label</div>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-describedby", "existing-non-label-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-describedby references both label and non-label elements", () => {
            const customContext: TSESLint.RuleContext<string, unknown[]> = {
                getSourceCode: () => ({
                    getText: () => "<h2 id='existing-label-id'>Test Label</h2>",
                    text: () => "<h2 id='existing-label-id'>Test Label</h2>"
                })
            } as unknown as TSESLint.RuleContext<string, unknown[]>;

            openingElement.attributes = [createJSXAttribute("aria-describedby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });
    });
});
