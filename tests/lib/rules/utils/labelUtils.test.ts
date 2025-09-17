// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    hasAssociatedLabelViaAriaLabelledBy,
    hasAssociatedLabelViaAriaDescribedby,
    hasAssociatedLabelViaHtmlFor,
    hasAssociatedAriaText,
    isInsideLabelTag,
    hasLabelWithHtmlForId,
    hasLabelWithHtmlId,
    hasOtherElementWithHtmlId,
    hasBracedAttrId,
    getAttributeValueInfo
} from "../../../../lib/util/labelUtils";

import { TSESTree, TSESLint, AST_NODE_TYPES } from "@typescript-eslint/utils";

describe("labelUtils", () => {
    const mockContext = (sourceText = "mocked text"): TSESLint.RuleContext<string, unknown[]> => {
        return {
            getSourceCode: () => ({
                getText: () => sourceText,
                text: sourceText
            })
        } as unknown as TSESLint.RuleContext<string, unknown[]>;
    };

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
            openingElement = { attributes: [] } as unknown as TSESTree.JSXOpeningElement;
        });

        test("returns false when attribute missing / empty / non-string", () => {
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, context)).toBe(false);

            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, context)).toBe(false);

            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", 123)];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, context)).toBe(false);
        });

        test("literal references: label and non-label are detected", () => {
            const ctxLabel = mockContext("<Label id='lbl1'>L</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "lbl1")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctxLabel)).toBe(true);

            const ctxDiv = mockContext("<div id='div1'>D</div>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "div1")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctxDiv)).toBe(true);
        });

        test("expression-literal and identifier forms are handled", () => {
            const ctxExpr = mockContext('<Label id={"exprId"}>L</Label>');
            openingElement.attributes = [createJSXAttributeExpressionLiteral("aria-labelledby", "exprId")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctxExpr)).toBe(true);

            const ctxIdentLabel = mockContext("<Label id={identId}>L</Label>");
            openingElement.attributes = [createJSXAttributeExpressionIdentifier("aria-labelledby", "identId")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctxIdentLabel)).toBe(true);

            const ctxIdentDiv = mockContext("<div id={identDiv}></div>");
            openingElement.attributes = [createJSXAttributeExpressionIdentifier("aria-labelledby", "identDiv")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctxIdentDiv)).toBe(true);
        });

        test("multi-id positive and negative paths", () => {
            const ctxMulti = mockContext("<div id='a'></div><Label id='b'>L</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "zzz b")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctxMulti)).toBe(true);

            const ctxNone = mockContext("<div id='one'></div>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-labelledby", "nope1 nope2")];
            expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctxNone)).toBe(false);
        });

        test("JSXExpressionContainer with non-Identifier expression => returns false (negative path)", () => {
            const memberExpr = { type: AST_NODE_TYPES.MemberExpression, object: { name: "x" }, property: { name: "y" } } as any;
            const exprContainer = {
                type: AST_NODE_TYPES.JSXExpressionContainer,
                expression: memberExpr
            } as unknown as TSESTree.JSXExpressionContainer;
            openingElement.attributes = [
                {
                    type: AST_NODE_TYPES.JSXAttribute,
                    name: { type: AST_NODE_TYPES.JSXIdentifier, name: "aria-labelledby" } as TSESTree.JSXIdentifier,
                    value: exprContainer
                } as unknown as TSESTree.JSXAttribute
            ];
            const ctx = mockContext("<div id='exists'></div>");
            const spy = jest.spyOn(console, "error").mockImplementation(() => {});
            try {
                expect(hasAssociatedLabelViaAriaLabelledBy(openingElement, ctx)).toBe(false);
            } finally {
                spy.mockRestore();
            }
        });
    });

    describe("hasAssociatedLabelViaAriaDescribedby", () => {
        let context: TSESLint.RuleContext<string, unknown[]>;
        let openingElement: TSESTree.JSXOpeningElement;

        beforeEach(() => {
            context = mockContext();
            openingElement = { attributes: [] } as unknown as TSESTree.JSXOpeningElement;
        });

        test("basic literal and expression coverage", () => {
            const ctxLabel = mockContext("<Label id='lbl'>L</Label>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "lbl")];
            expect(hasAssociatedLabelViaAriaDescribedby(openingElement, ctxLabel)).toBe(true);

            const ctxDiv = mockContext("<div id='div'>Desc</div>");
            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "div")];
            expect(hasAssociatedLabelViaAriaDescribedby(openingElement, ctxDiv)).toBe(true);

            openingElement.attributes = [createJSXAttributeLiteral("aria-describedby", "a b c")];
            const ctxNone = mockContext("<div id='one'></div>");
            expect(hasAssociatedLabelViaAriaDescribedby(openingElement, ctxNone)).toBe(false);
        });

        test("expression-literal and identifier forms handled", () => {
            const ctxExpr = mockContext('<Label id={"lblX"}>L</Label>');
            openingElement.attributes = [createJSXAttributeExpressionLiteral("aria-describedby", "lblX")];
            expect(hasAssociatedLabelViaAriaDescribedby(openingElement, ctxExpr)).toBe(true);

            const ctxIdent = mockContext("<div id={someId}>D</div>");
            openingElement.attributes = [createJSXAttributeExpressionIdentifier("aria-describedby", "someId")];
            expect(hasAssociatedLabelViaAriaDescribedby(openingElement, ctxIdent)).toBe(true);
        });
    });

    describe("hasAssociatedLabelViaHtmlFor", () => {
        test("id literal, expression-literal and identifier cases", () => {
            const ctxLit = mockContext('<Label htmlFor="my-input">Best pet</Label>');
            const openingLit = { attributes: [createJSXAttributeLiteral("id", "my-input")] } as unknown as TSESTree.JSXOpeningElement;
            expect(hasAssociatedLabelViaHtmlFor(openingLit, ctxLit)).toBe(true);

            const ctxExpr = mockContext('<Label htmlFor={"x"}>L</Label>');
            const openingExpr = { attributes: [createJSXAttributeExpressionLiteral("id", "x")] } as unknown as TSESTree.JSXOpeningElement;
            expect(hasAssociatedLabelViaHtmlFor(openingExpr, ctxExpr)).toBe(true);

            const ctxIdent = mockContext("<Label htmlFor={idVar}>L</Label>");
            const openingIdent = { attributes: [createJSXAttributeExpressionIdentifier("id", "idVar")] } as unknown as TSESTree.JSXOpeningElement;
            expect(hasAssociatedLabelViaHtmlFor(openingIdent, ctxIdent)).toBe(true);
        });
    });

    describe("low-level helpers", () => {
        test("isInsideLabelTag true/false and hasBracedAttrId behavior", () => {
            const ctxLabel = { getAncestors: () => [{ type: "JSXElement", openingElement: { name: { type: AST_NODE_TYPES.JSXIdentifier, name: "Label" } } }] } as unknown as TSESLint.RuleContext<string, unknown[]>;
            expect(isInsideLabelTag(ctxLabel)).toBe(true);

            const ctxNot = { getAncestors: () => [{ type: "NotJSX" }] } as unknown as TSESLint.RuleContext<string, unknown[]>;
            expect(isInsideLabelTag(ctxNot)).toBe(false);

            const ctxTrue = mockContext("<Label id={a.b}></Label><div id={d-1}></div>");
            expect(hasBracedAttrId("Label|label", "id", "a.b", ctxTrue)).toBe(true);
            expect(hasBracedAttrId("div|span|p|h[1-6]", "id", "d-1", ctxTrue)).toBe(true);

            const ctxFalse = mockContext("<Label id={present}></Label>");
            expect(hasBracedAttrId("Label|label", "id", "missing", ctxFalse)).toBe(false);
        });

        test("hasOtherElementWithHtmlId recognizes common tags", () => {
            const ctx = mockContext("<h3 id='h3id'>H</h3><h6 id='h6id'>H</h6>");
            expect(hasOtherElementWithHtmlId("h3id", ctx)).toBe(true);
            expect(hasOtherElementWithHtmlId("h6id", ctx)).toBe(true);
        });
    });

    describe("additional alternation & loop-branch coverage", () => {
        test("combined alternation forms for labels/htmlFor/other elements", () => {
            const src = [
                "<Label id=\"a\"></Label>",
                "<Label id='b'></Label>",
                '<Label id={"c"}></Label>',
                "<Label id={'d'}></Label>",
                "<Label id={e}></Label>"
            ].join("");
            const ctx = mockContext(src);
            expect(hasLabelWithHtmlId("a", ctx)).toBe(true);
            expect(hasLabelWithHtmlId("b", ctx)).toBe(true);
            expect(hasLabelWithHtmlId("c", ctx)).toBe(true);
            expect(hasLabelWithHtmlId("d", ctx)).toBe(true);
            expect(hasLabelWithHtmlId("e", ctx)).toBe(true);

            const srcFor = [
                "<Label htmlFor=\"A1\"></Label>",
                "<Label htmlFor='B1'></Label>",
                '<Label htmlFor={"C1"}></Label>',
                "<Label htmlFor={'D1'}></Label>",
                "<Label htmlFor={E1}></Label>"
            ].join("");
            const ctxFor = mockContext(srcFor);
            expect(hasLabelWithHtmlForId("A1", ctxFor)).toBe(true);
            expect(hasLabelWithHtmlForId("B1", ctxFor)).toBe(true);
            expect(hasLabelWithHtmlForId("C1", ctxFor)).toBe(true);
            expect(hasLabelWithHtmlForId("D1", ctxFor)).toBe(true);
            expect(hasLabelWithHtmlForId("E1", ctxFor)).toBe(true);
        });

        test("whitespace/trimming + aria list negative", () => {
            const opening = { attributes: [createJSXAttributeLiteral("aria-labelledby", "   ")] } as unknown as TSESTree.JSXOpeningElement;
            const ctx = mockContext("<div id='exists'></div>");
            expect(hasAssociatedAriaText(opening, ctx, "aria-labelledby")).toBe(false);

            const openingId = { attributes: [createJSXAttributeLiteral("id", "  spacedId  ")] } as unknown as TSESTree.JSXOpeningElement;
            const ctxLabel = mockContext('<Label htmlFor="spacedId">L</Label>');
            expect(hasAssociatedLabelViaHtmlFor(openingId, ctxLabel)).toBe(true);
        });
    });

    describe("getAttributeValueInfo helper", () => {
        test("parses string-valued attribute into tokens and trims", () => {
            const opening = { attributes: [createJSXAttributeLiteral("aria-labelledby", "  a  b  ")] } as unknown as TSESTree.JSXOpeningElement;
            const ctx = mockContext("<Label id='a'></Label><div id='b'></div>");
            const info = getAttributeValueInfo(opening, ctx, "aria-labelledby") as any;
            expect(info.kind).toBe("string");
            expect(info.raw).toBe("a  b".trim());
            expect(info.tokens).toEqual(["a", "b"]);
        });

        test("detects identifier expression form on a JSXExpressionContainer", () => {
            const opening = { attributes: [createJSXAttributeExpressionIdentifier("aria-labelledby", "someId")] } as unknown as TSESTree.JSXOpeningElement;
            const ctx = mockContext("<div id={someId}></div>");
            const info = getAttributeValueInfo(opening, ctx, "aria-labelledby") as any;
            expect(info.kind).toBe("identifier");
            expect(info.name).toBe("someId");
        });
    });
});
