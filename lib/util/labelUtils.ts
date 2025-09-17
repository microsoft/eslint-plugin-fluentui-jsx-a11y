// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { elementType } from "jsx-ast-utils";
import { getPropValue } from "jsx-ast-utils";
import { getProp } from "jsx-ast-utils";
import { TSESLint } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";
import { TSESTree } from "@typescript-eslint/utils";

/**
 * Utility helpers for determining whether JSX controls are associated with visual labels
 * via id/htmlFor/aria-labelledby/aria-describedby attributes.
 *
 * Supports these attribute value forms:
 *  - Literal strings: id="value" or id='value'
 *  - Expression containers: id={"value"} or id={variable}
 *  - Binary concatenations: id={"prefix" + suffix}
 *  - Template literals: id={`prefix-${variable}`}
 *
 * getAttributeValueInfo normalizes attributes into these canonical forms:
 *  - { kind: "string", raw: string, tokens: string[], exprText?: string }
 *  - { kind: "identifier", name: string }
 *  - { kind: "template", template: string }
 *  - { kind: "empty" | "none" }
 */

const validIdentifierRe = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * Checks if the element is nested within a Label tag.
 */
const isInsideLabelTag = (context: TSESLint.RuleContext<string, unknown[]>): boolean =>
    context.getAncestors().some(node => {
        if (node.type !== "JSXElement") return false;
        const tagName = elementType(node.openingElement as unknown as JSXOpeningElement);
        return tagName.toLowerCase() === "label";
    });

/** Regex patterns for matching id/htmlFor attributes in source text. */
const idLiteralDouble = '"([^"]*)"';
const idLiteralSingle = "'([^']*)'";
const exprStringDouble = '\\{\\s*"([^"]*)"\\s*\\}';
const exprStringSingle = "\\{\\s*'([^']*)'\\s*\\}";
const exprIdentifier = "\\{\\s*([A-Za-z_$][A-Za-l0-9_$]*)\\s*\\}";

const idOrExprRegex = new RegExp(
    `(?:${idLiteralDouble}|${idLiteralSingle}|${exprStringDouble}|${exprStringSingle}|${exprIdentifier})`,
    "i"
);

const escapeForRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSourceText = (context: TSESLint.RuleContext<string, unknown[]>) => (context.getSourceCode() as any).text as string;

/**
 * Extracts captured id value from regex match using idOrExprRegex.
 * Returns the first non-empty capture group from positions 2-6.
 */
const extractCapturedId = (match: RegExpExecArray): string | undefined => {
    return match[2] || match[3] || match[4] || match[5] || match[6] || undefined;
};

/**
 * Evaluates constant BinaryExpression concatenations composed entirely of Literals.
 * Returns the computed string value or undefined if evaluation fails.
 */
const evalConstantString = (node: any): string | undefined => {
    if (!node || typeof node !== "object") return undefined;
    if (node.type === "Literal") {
        return String(node.value);
    }
    if (node.type === "BinaryExpression" && node.operator === "+") {
        const left = evalConstantString(node.left);
        if (left === undefined) return undefined;
        const right = evalConstantString(node.right);
        if (right === undefined) return undefined;
        return left + right;
    }
    return undefined;
};

/**
 * Reconstructs source-like representation for Literal and BinaryExpression nodes.
 * Used for source-text matching of constant binary concatenations.
 * Strings are JSON.stringify'd, numbers use String(), binary expressions use "left + right" format.
 */
const renderSimpleExprSource = (node: any): string | undefined => {
    if (!node || typeof node !== "object") return undefined;
    if (node.type === "Literal") {
        const val = (node as any).value;
        if (typeof val === "string") return JSON.stringify(val);
        return String(val);
    }
    if (node.type === "BinaryExpression" && node.operator === "+") {
        const left = renderSimpleExprSource(node.left);
        if (left === undefined) return undefined;
        const right = renderSimpleExprSource(node.right);
        if (right === undefined) return undefined;
        return `${left} + ${right}`;
    }
    return undefined;
};

/**
 * Builds regex pattern from template literal that matches literal parts
 * but allows any expression inside ${...} placeholders.
 */
const buildTemplatePattern = (template: string): string => {
    const placeholderRe = /\$\{[^}]*\}/g;
    let pattern = "";
    let idx = 0;
    let m: RegExpExecArray | null;
    while ((m = placeholderRe.exec(template)) !== null) {
        pattern += escapeForRegExp(template.slice(idx, m.index));
        pattern += "\\$\\{[^}]*\\}";
        idx = m.index + m[0].length;
    }
    pattern += escapeForRegExp(template.slice(idx));
    return pattern;
};

/**
 * Tests if template matches any Label/label or other element with the specified attribute.
 */
const hasTemplateMatch = (template: string, attributeName: string, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    const src = getSourceText(context);
    const pattern = buildTemplatePattern(template);
    const labelRe = new RegExp(`<(?:Label|label)[^>]*\\b${attributeName}\\s*=\\s*\\{\\s*${pattern}\\s*\\}`, "i");
    const otherRe = new RegExp(`<(?:div|span|p|h[1-6])[^>]*\\b${attributeName}\\s*=\\s*\\{\\s*${pattern}\\s*\\}`, "i");
    return labelRe.test(src) || otherRe.test(src);
};

/**
 * Normalizes attribute values into canonical shapes for consistent processing.
 */
const getAttributeValueInfo = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>,
    attrName: string
): any => {
    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], attrName);

    if (prop && prop.value && (prop.value as any).type === "JSXExpressionContainer") {
        const expr = (prop.value as any).expression;

        // Identifier: only accept valid JS identifiers (no hyphens, etc.)
        if (expr && expr.type === "Identifier") {
            if (typeof expr.name === "string" && validIdentifierRe.test(expr.name)) {
                return { kind: "identifier", name: expr.name as string };
            }
            return { kind: "none" };
        }

        if (expr && expr.type === "Literal" && typeof (expr as any).value === "string") {
            const trimmed = ((expr as any).value as string).trim();
            if (trimmed === "") return { kind: "empty" };
            return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/), exprText: JSON.stringify((expr as any).value) };
        }

        if (expr && expr.type === "BinaryExpression") {
            const v = evalConstantString(expr);
            if (typeof v === "string") {
                const trimmed = v.trim();
                if (trimmed === "") return { kind: "empty" };
                const exprText = renderSimpleExprSource(expr);
                if (exprText) {
                    return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/), exprText };
                }
                return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/) };
            }
        }

        if (expr && expr.type === "TemplateLiteral") {
            try {
                const quasis = (expr as any).quasis || [];
                const expressions = (expr as any).expressions || [];
                let templateRaw = "`";
                for (let i = 0; i < quasis.length; i++) {
                    const q = quasis[i];
                    const rawPart = (q && q.value && (q.value.raw ?? q.value.cooked)) || "";
                    templateRaw += rawPart;
                    if (i < expressions.length) {
                        const e = expressions[i];
                        if (e && e.type === "Identifier" && typeof e.name === "string") {
                            templateRaw += "${" + e.name + "}";
                        } else if (e && e.type === "Literal") {
                            templateRaw += "${" + String((e as any).value) + "}";
                        } else {
                            templateRaw += "${}";
                        }
                    }
                }
                templateRaw += "`";
                return { kind: "template", template: templateRaw };
            } catch {
                // Fall through to getPropValue fallback
            }
        }
    }

    // Fallback to jsx-ast-utils for literal attributes and other resolvable cases
    const resolved = prop ? getPropValue(prop) : undefined;
    if (typeof resolved === "string") {
        const trimmed = resolved.trim();
        if (trimmed === "") return { kind: "empty" };
        return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/) };
    }

    return { kind: "none" };
};

/**
 * Searches for elements with braced attribute values (e.g., <Label id={variable}>).
 */
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
 * Checks if any Label exists with htmlFor matching the given value.
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
 * Checks if any Label exists with id matching the given value.
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
 * Checks if any other element (div/span/p/h1-h6) has id matching the given value.
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
 * Checks if aria-* attribute references existing label or other elements.
 * Handles string tokens, identifier variables, and template literals.
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
            if (info.exprText) {
                const labelRe = new RegExp(`<(?:Label|label)[^>]*\\bid\\s*=\\s*\\{\\s*${escapeForRegExp(info.exprText)}\\s*\\}`, "i");
                const otherRe = new RegExp(`<(?:div|span|p|h[1-6])[^>]*\\bid\\s*=\\s*\\{\\s*${escapeForRegExp(info.exprText)}\\s*\\}`, "i");
                const src = getSourceText(context);
                if (labelRe.test(src) || otherRe.test(src)) return true;
            }
        }
        return false;
    }

    if (info.kind === "identifier") {
        const varName = info.name;
        return hasBracedAttrId("Label|label", "id", varName, context) || hasBracedAttrId("div|span|p|h[1-6]", "id", varName, context);
    }

    if (info.kind === "template") {
        return hasTemplateMatch(info.template as string, "id", context);
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

/**
 * Checks if element's id attribute has an associated Label with matching htmlFor.
 * Handles string literals, identifier variables, and template literals.
 */
const hasAssociatedLabelViaHtmlFor = (openingElement: TSESTree.JSXOpeningElement, context: TSESLint.RuleContext<string, unknown[]>) => {
    const info = getAttributeValueInfo(openingElement, context, "id");

    if (info.kind === "string") {
        if (hasLabelWithHtmlForId(info.raw, context)) return true;
        if (info.exprText) {
            const src = getSourceText(context);
            const htmlForRe = new RegExp(`<(?:Label|label)[^>]*\\bhtmlFor\\s*=\\s*\\{\\s*${escapeForRegExp(info.exprText)}\\s*\\}`, "i");
            if (htmlForRe.test(src)) return true;
        }
        return false;
    }

    if (info.kind === "identifier") {
        const varName = info.name;
        return hasBracedAttrId("Label|label", "htmlFor", varName, context);
    }

    if (info.kind === "template") {
        return hasTemplateMatch(info.template as string, "htmlFor", context);
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
