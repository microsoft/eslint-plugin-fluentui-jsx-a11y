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

    const fallbackRe = new RegExp(`<(?:Label|label)[^>]*\\bhtmlFor\\s*=\\s*\\{\\s*${escapeForRegExp(idValue)}\\s*\\}`, "i");
    return fallbackRe.test(source);
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

    const fallbackRe = new RegExp(`<(?:Label|label)[^>]*\\bid\\s*=\\s*\\{\\s*${escapeForRegExp(idValue)}\\s*\\}`, "i");
    return fallbackRe.test(source);
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

    const fallbackRe = new RegExp(`<(?:div|span|p|h[1-6])[^>]*\\bid\\s*=\\s*\\{\\s*${escapeForRegExp(idValue)}\\s*\\}`, "i");
    return fallbackRe.test(source);
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
    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], ariaAttribute);
    const resolved = prop ? getPropValue(prop) : undefined;

    if (typeof resolved === "string" && resolved.trim() !== "") {
        // support space-separated lists like "first second" — check each id independently
        const ids = resolved.trim().split(/\s+/);
        for (const id of ids) {
            if (hasLabelWithHtmlId(id, context) || hasOtherElementWithHtmlId(id, context)) {
                return true;
            }
        }
        return false;
    }

    // identifier expression: aria-*= {someIdentifier}
    if (prop && prop.value && prop.value.type === "JSXExpressionContainer") {
        const expr = (prop.value as any).expression;
        if (expr && expr.type === "Identifier") {
            const varName = expr.name as string;
            const src = getSourceText(context);
            const labelMatch = new RegExp(`<(?:Label|label)[^>]*\\bid\\s*=\\s*\\{\\s*${escapeForRegExp(varName)}\\s*\\}`, "i").test(src);
            const otherMatch = new RegExp(`<(?:div|span|p|h[1-6])[^>]*\\bid\\s*=\\s*\\{\\s*${escapeForRegExp(varName)}\\s*\\}`, "i").test(
                src
            );
            return labelMatch || otherMatch;
        }
    }

    return false;
};

/* thin wrappers kept for compatibility with existing callers */
const hasAssociatedLabelViaAriaLabelledBy = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>
) => hasAssociatedAriaText(openingElement, context, "aria-labelledby");

const hasAssociatedLabelViaAriaDescribedby = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>
) => hasAssociatedAriaText(openingElement, context, "aria-describedby");

/**
 * htmlFor / id relationship helper for controls (string + identifier fallback)
 */
const hasAssociatedLabelViaHtmlFor = (openingElement: TSESTree.JSXOpeningElement, context: TSESLint.RuleContext<string, unknown[]>) => {
    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], "id");
    const resolved = prop ? getPropValue(prop) : undefined;

    if (typeof resolved === "string" && resolved.trim() !== "") {
        return hasLabelWithHtmlForId(resolved, context);
    }

    if (prop && prop.value && prop.value.type === "JSXExpressionContainer") {
        const expr = (prop.value as any).expression;
        if (expr && expr.type === "Identifier") {
            const varName = expr.name as string;
            const src = getSourceText(context);
            return new RegExp(`<(?:Label|label)[^>]*\\bhtmlFor\\s*=\\s*\\{\\s*${escapeForRegExp(varName)}\\s*\\}`, "i").test(src);
        }
    }

    return false;
};

/* exported API */
export {
    isInsideLabelTag,
    hasLabelWithHtmlForId,
    hasLabelWithHtmlId,
    hasAssociatedLabelViaAriaLabelledBy,
    hasAssociatedLabelViaHtmlFor,
    hasAssociatedLabelViaAriaDescribedby,
    hasAssociatedAriaText,
    hasOtherElementWithHtmlId
};
