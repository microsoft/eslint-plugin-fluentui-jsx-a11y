// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { elementType } from "jsx-ast-utils";
import { getPropValue } from "jsx-ast-utils";
import { getProp } from "jsx-ast-utils";
import { TSESLint } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";
import { TSESTree } from "@typescript-eslint/utils";

/**
 * Checks if the element is nested within a Label tag.
 */
const isInsideLabelTag = (context: TSESLint.RuleContext<string, unknown[]>): boolean =>
    context.getAncestors().some(node => {
        if (node.type !== "JSXElement") return false;
        const tagName = elementType(node.openingElement as unknown as JSXOpeningElement);
        return tagName.toLowerCase() === "label";
    });

/**
 * idOrExprRegex supports:
 *  - "double-quoted" and 'single-quoted' attribute values
 *  - expression containers with quoted strings:    htmlFor={"id"} or id={'id'}
 *  - expression containers with an Identifier:     htmlFor={someId} or id={someId}
 *
 * Capture groups (when the alternation matches) are in positions 2..6
 * (group 1 is the element/tag capture used in some surrounding regexes).
 */
const idOrExprRegex = /(?:"([^"]*)"|'([^']*)'|\{\s*"([^"]*)"\s*\}|\{\s*'([^']*)'\s*\}|\{\s*([A-Za-z_$][A-ZaLign$0-9_$]*)\s*\})/i;

const escapeForRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSourceText = (context: TSESLint.RuleContext<string, unknown[]>) => (context.getSourceCode() as any).text as string;

/**
 * Return captured id value from regex match where idOrExprRegex was used as the RHS.
 * match[2]..match[6] are the possible capture positions.
 */
const extractCapturedId = (match: RegExpExecArray): string | undefined => {
    return match[2] || match[3] || match[4] || match[5] || match[6] || undefined;
};

/**
 * New small helper: normalize attribute value (string list vs identifier vs empty/none)
 * Keeps getProp/getPropValue usage isolated and provides a single place to trim/split.
 * Return shape (for consumers): 
 *   { kind: "string", raw: string, tokens: string[] }
 *   { kind: "identifier", name: string }
 *   { kind: "empty" }
 *   { kind: "none" }
 */
const getAttributeValueInfo = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>,
    attrName: string
): any => {
    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], attrName);

    if (prop && prop.value && (prop.value as any).type === "JSXExpressionContainer") {
        const expr = (prop.value as any).expression;
        if (expr && expr.type === "Identifier") {
            return { kind: "identifier", name: expr.name as string };
        }
        if (expr && expr.type === "Literal" && typeof (expr as any).value === "string") {
            const trimmed = ((expr as any).value as string).trim();
            if (trimmed === "") return { kind: "empty" };
            return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/) };
        }
    }

    const resolved = prop ? getPropValue(prop) : undefined;
    if (typeof resolved === "string") {
        const trimmed = resolved.trim();
        if (trimmed === "") return { kind: "empty" };
        return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/) };
    }

    return { kind: "none" };
};

const hasBracedAttrId = (
    tagPattern: string,
    attrName: string,
    idValue: string,
    context: TSESLint.RuleContext<string, unknown[]>
): boolean => {
    if (!idValue) return false;
    const src = getSourceText(context);
    const re = new RegExp(`<(?:${tagPattern})[^>]*\\b${attrName}\\s*=\\s*\\{\\s*${escapeForRegExp(idValue)}\\s*\\}`, "i");
    return re.test(src);
};

/**
 * Checks if a Label exists with htmlFor that matches idValue.
 * Handles:
 *  - htmlFor="id", htmlFor={'id'}, htmlFor={"id"}, htmlFor={idVar}
 */
const hasLabelWithHtmlForId = (idValue: string, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    if (!idValue) return false;
    const source = getSourceText(context);
    const regex = new RegExp(`<(Label|label)[^>]*\\bhtmlFor\\s*=\\s*${idOrExprRegex.source}`, "gi");

    let match: RegExpExecArray | null;
    while ((match = regex.exec(source)) !== null) {
        const capturedValue = extractCapturedId(match);
        if (capturedValue === idValue) return true;
    }

    return hasBracedAttrId("Label|label", "htmlFor", idValue, context);
};

/**
 * Checks if a Label exists with id that matches idValue.
 * Handles: id="x", id={'x'}, id={"x"}, id={x}
 */
const hasLabelWithHtmlId = (idValue: string, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    if (!idValue) return false;
    const source = getSourceText(context);
    const regex = new RegExp(`<(Label|label)[^>]*\\bid\\s*=\\s*${idOrExprRegex.source}`, "gi");

    let match: RegExpExecArray | null;
    while ((match = regex.exec(source)) !== null) {
        const capturedValue = extractCapturedId(match);
        if (capturedValue === idValue) return true;
    }

    return hasBracedAttrId("Label|label", "id", idValue, context);
};

/**
 * Checks other simple elements (div/span/p/h1..h6) for id matching idValue.
 */
const hasOtherElementWithHtmlId = (idValue: string, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    if (!idValue) return false;
    const source = getSourceText(context);
    const regex = new RegExp(`<(div|span|p|h[1-6])[^>]*\\bid\\s*=\\s*${idOrExprRegex.source}`, "gi");

    let match: RegExpExecArray | null;
    while ((match = regex.exec(source)) !== null) {
        const capturedValue = extractCapturedId(match);
        if (capturedValue === idValue) return true;
    }

    return hasBracedAttrId("div|span|p|h[1-6]", "id", idValue, context);
};

/**
 * Generic helper for aria-* attributes:
 * - if prop resolves to a string (literal or expression-literal) then we check labels/ids
 * - if prop is an identifier expression (aria-*= {someId}) we fall back to a narrow regex that checks
 *   other elements/labels with id={someId}
 *
 * This keeps the implementation compact and robust for the project's tests and common source patterns.
 */
const hasAssociatedAriaText = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>,
    ariaAttribute: string
): boolean => {
    const info = getAttributeValueInfo(openingElement, context, ariaAttribute);

    if (info.kind === "string") {
        for (const id of info.tokens) {
            if (hasLabelWithHtmlId(id, context) || hasOtherElementWithHtmlId(id, context)) {
                return true;
            }
        }
        return false;
    }

    if (info.kind === "identifier") {
        const varName = info.name;
        return hasBracedAttrId("Label|label", "id", varName, context) || hasBracedAttrId("div|span|p|h[1-6]", "id", varName, context);
    }

    return false;
};

const hasAssociatedLabelViaAriaLabelledBy = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>
) => hasAssociatedAriaText(openingElement, context, "aria-labelledby");

const hasAssociatedLabelViaAriaDescribedby = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>
) => hasAssociatedAriaText(openingElement, context, "aria-describedby");

const hasAssociatedLabelViaHtmlFor = (openingElement: TSESTree.JSXOpeningElement, context: TSESLint.RuleContext<string, unknown[]>) => {
    const info = getAttributeValueInfo(openingElement, context, "id");

    if (info.kind === "string") {
        return hasLabelWithHtmlForId(info.raw, context);
    }

    if (info.kind === "identifier") {
        const varName = info.name;
        return hasBracedAttrId("Label|label", "htmlFor", varName, context);
    }

    return false;
};

export {
    isInsideLabelTag,
    hasLabelWithHtmlForId,
    hasLabelWithHtmlId,
    hasAssociatedLabelViaAriaLabelledBy,
    hasAssociatedLabelViaHtmlFor,
    hasAssociatedLabelViaAriaDescribedby,
    hasAssociatedAriaText,
    hasOtherElementWithHtmlId,
    hasBracedAttrId,
    getAttributeValueInfo
};
