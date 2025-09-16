// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { hasAssociatedLabelViaAriaLabelledBy, hasAssociatedLabelViaAriaDescribedby } from "../../../../lib/util/labelUtils";

import { TSESTree, TSESLint, AST_NODE_TYPES } from "@typescript-eslint/utils"; // Use TSESTree types consistently

describe("labelUtils", () => {
    // Lightweight mock context factory with getSourceCode() that exposes getText() and text (string)
    const mockContext = (sourceText = "mocked text"): TSESLint.RuleContext<string, unknown[]> => {
        return {
            getSourceCode: () => ({
                getText: () => sourceText,
                text: sourceText
            })
        } as unknown as TSESLint.RuleContext<string, unknown[]>;
    };

    // Helpers to create JSXAttribute nodes for tests.
    function createJSXAttributeLiteral(name: string, value: string | number | null): TSESTree.JSXAttribute {
        return {
            type: AST_NODE_TYPES.JSXAttribute,
            name: { type: AST_NODE_TYPES.JSXIdentifier, name } as TSESTree.JSXIdentifier,
            value: value !== null ? ({ type: AST_NODE_TYPES.Literal, value } as TSESTree.Literal) : null,
            loc: {} as TSESTree.SourceLocation,
            range: [0, 0]
        } as unknown as TSESTree.JSXAttribute;
    }

    function createJSXAttributeExpressionLiteral(name: string, literalValue: string | number): TSESTree.JSXAttribute {
        const literalNode = { type: AST_NODE_TYPES.Literal, value: literalValue } as TSESTree.Literal;
        const exprContainer = {
            type: AST_NODE_TYPES.JSXExpressionContainer,
            expression: literalNode
        } as unknown as TSESTree.JSXExpressionContainer;
        return {
            type: AST_NODE_TYPES.JSXAttribute,
            name: { type: AST_NODE_TYPES.JSXIdentifier, name } as TSESTree.JSXIdentifier,
            value: exprContainer,
            loc: {} as TSESTree.SourceLocation,
            range: [0, 0]
        } as unknown as TSESTree.JSXAttribute;
    }

    function createJSXAttributeExpressionIdentifier(name: string, identifierName: string): TSESTree.JSXAttribute {
        const identNode = { type: AST_NODE_TYPES.Identifier, name: identifierName } as unknown as TSESTree.Identifier;
        const exprContainer = {
            type: AST_NODE_TYPES.JSXExpressionContainer,
            expression: identNode
        } as unknown as TSESTree.JSXExpressionContainer;
        return {
            type: AST_NODE_TYPES.JSXAttribute,
            name: { type: AST_NODE_TYPES.JSXIdentifier, name } as TSESTree.JSXIdentifier,
            value: exprContainer,
            loc: {} as TSESTree.SourceLocation,
            range: [0, 0]
        } as unknown as TSESTree.JSXAttribute;
    }

    describe("hasAssociatedLabelViaAriaLabelledBy", () => {
        let context: TSESLint.RuleContext<string, unknown[]>;
        let openingElement: TSESTree.JSXOpeningElement;

        beforeEach(() => {
            context = mockContext();
            openingElement = {
                attributes: []
            } as unknown as TSESTree.JSXOpeningElement;
        });

        test("returns false if aria-labelledby is missing", () => {
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-labelledby is empty", () => {
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-labelledby value is not a string", () => {
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", 123)];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if referenced element by id does not exist (literal)", () => {
            const customContext = mockContext("<Label id='existing-label-id'>Test Label</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "non-existing-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(false);
        });

        test("returns true if aria-labelledby references an existing label element (literal)", () => {
            const customContext = mockContext("<Label id='existing-label-id'>Test Label</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-labelledby references an existing label element without duplicates (literal)", () => {
            const customContext = mockContext(
                "<Label id='existing-label-id'>Test Label</Label><Label id='existing-label-id-2'>Test Label</Label>"
            );
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-labelledby references an existing non-label element (literal)", () => {
            const customContext = mockContext("<div id='existing-non-label-id'>Test Label</div>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "existing-non-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-labelledby references both label and non-label elements (literal)", () => {
            const customContext = mockContext("<h2 id='existing-label-id'>Test Label</h2>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        // Expression-literal case for aria-labelledby: aria-labelledby={"existing-label-id"}
        test("returns true when aria-labelledby references an existing label with expression-literal value", () => {
            const customContext = mockContext('<Label id={"existing-label-id"}>Test Label</Label>');
            openingElement.attributes = [createJSXAttributeExpressionLiteral("aria-labelledby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        // Identifier expression: aria-labelledby={existingLabelId} with Label id={existingLabelId}
        test("returns true when aria-labelledby uses identifier expression and referenced element has id as identifier expression", () => {
            const customContext = mockContext("<Label id={existingLabelId}>Test Label</Label>");
            openingElement.attributes = [createJSXAttributeExpressionIdentifier("aria-labelledby", "existingLabelId")];
            const result = hasAssociatedLabelViaAriaLabelledBy(openingElement, customContext);
            expect(result).toBe(true);
        });

        // Combined case: matching one identifier among others (identifier-based attribute)
        test("returns true when aria-labelledby contains multiple ids and one matches a referenced identifier id", () => {
            const customContext = mockContext("<div id={firstId}></div><Label id={secondId}>Label</Label>");
            openingElement.attributes = [createJSXAttributeExpressionIdentifier("aria-labelledby", "secondId")];
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

        test("returns false if aria-describedby is missing", () => {
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-describedby is empty", () => {
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if aria-describedby value is not a string", () => {
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", 123)];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, context);
            expect(result).toBe(false);
        });

        test("returns false if referenced element by id does not exist (literal)", () => {
            const customContext = mockContext("<Label id='existing-label-id'>Test Label</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "non-existing-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(false);
        });

        test("returns true if aria-describedby references an existing label element (literal)", () => {
            const customContext = mockContext("<Label id='existing-label-id'>Test Label</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-describedby references an existing non-label element (literal)", () => {
            const customContext = mockContext("<div id='existing-non-label-id'>Test Label</div>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "existing-non-label-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });

        test("returns true if aria-describedby references both label and non-label elements (literal)", () => {
            const customContext = mockContext("<h2 id='existing-label-id'>Test Label</h2>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });

        // Expression-literal case for aria-describedby
        test("returns true when aria-describedby references an existing label with expression-literal value", () => {
            const customContext = mockContext('<Label id={"existing-label-id"}>Test Label</Label>');
            openingElement.attributes = [createJSXAttributeExpressionLiteral("aria-describedby", "existing-label-id")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });

        // Identifier expression case for aria-describedby
        test("returns true when aria-describedby uses identifier expression and referenced element has id as identifier expression", () => {
            const customContext = mockContext("<Label id={existingLabelId}>Test Label</Label>");
            openingElement.attributes = [createJSXAttributeExpressionIdentifier("aria-describedby", "existingLabelId")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });

        // Combined case: aria-describedby referencing multiple ids (literal list)
        test("returns true when aria-describedby contains multiple ids and one matches an existing element (literal list)", () => {
            const customContext = mockContext("<div id='first'></div><Label id='second'>Label</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "first second")];
            const result = hasAssociatedLabelViaAriaDescribedby(openingElement, customContext);
            expect(result).toBe(true);
        });
    });
});
