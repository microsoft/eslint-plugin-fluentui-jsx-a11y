// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { elementType } from "jsx-ast-utils";
import { getPropValue } from "jsx-ast-utils";
import { getProp } from "jsx-ast-utils";
import { TSESLint } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";
import { TSESTree } from "@typescript-eslint/utils";

/**
 * Utility helpers used by several rules to determine whether a JSX control is
 * associated with a visual label (via id/htmlFor/aria-labelledby/aria-describedby).
 *
 * Supported attribute RHS shapes (matched by `idOrExprRegex` and in AST inspection):
 *  - "double-quoted" and 'single-quoted' attribute values
 *  - expression containers with quoted strings:    htmlFor={"id"} or id={'id'}
 *  - expression containers with an Identifier:     htmlFor={someId} or id={someId}
 *  - simple constant BinaryExpression concatenations made only of Literals: {"my-" + 1}
 *  - TemplateLiterals: `my-${value}` (we canonicalize literal parts and allow any expression inside ${...})
 *
 * getAttributeValueInfo normalizes the attribute into one of:
 *   - { kind: "string", raw: string, tokens: string[], exprText?: string }
 *   - { kind: "identifier", name: string }
 *   - { kind: "template", template: string }
 *   - { kind: "empty" }
 *   - { kind: "none" }
 *
 * Design notes:
 *  - Prefer AST inspection (JSXExpressionContainer) where available for precision.
 *  - Evaluate BinaryExpression concatenations only when composed entirely of Literals (conservative).
 *  - For TemplateLiteral matching we compare literal parts but allow any expression inside ${...}.
 *  - For some binary-constant cases we reconstruct a small source form (exprText) and attempt to
 *    find an exact-matching expression occurrence in the raw source when necessary.
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

/* id / expression alternatives used when matching id/htmlFor attributes in source text.
   Capture groups (when this alternation is embedded in a surrounding regex) occupy
   consecutive groups so extractCapturedId reads groups 2..6 (group 1 is typically the tag).
*/
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
 * Return captured id value from regex match where idOrExprRegex was used as the RHS.
 * match[2]..match[6] are the possible capture positions.
 */
const extractCapturedId = (match: RegExpExecArray): string | undefined => {
    return match[2] || match[3] || match[4] || match[5] || match[6] || undefined;
};

/**
 * Evaluate simple constant BinaryExpression concatenations (left/right are Literals or nested BinaryExpressions).
 * Returns string when evaluation succeeds, otherwise undefined.
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
 * Reconstruct a small, predictable source-like form for Literal and BinaryExpression nodes.
 * Used for conservative source-text matching of constant binary concatenations.
 * - Strings are JSON.stringify'd to preserve quoting.
 * - Numbers are converted with String().
 * - BinaryExpressions are rendered as "<left> + <right>" with spaces (consistent formatting).
 *
 * Note: this deliberately avoids attempting to stringify arbitrary expressions.
 */
const renderSimpleExprSource = (node: any): string | undefined => {
    if (!node || typeof node !== "object") return undefined;
    if (node.type === "Literal") {
        const val = (node as any).value;
        if (typeof val === "string") return JSON.stringify(val); // keep the quotes "..."
        return String(val);
    }
    if (node.type === "BinaryExpression" && node.operator === "+") {
        const left = renderSimpleExprSource(node.left);
        if (left === undefined) return undefined;
        const right = renderSimpleExprSource(node.right);
        if (right === undefined) return undefined;
        return `${left} + ${right}`;
    }
    // Not attempting to render arbitrary expressions (Identifiers, MemberExpression, etc.)
    return undefined;
};

/**
 * Normalize attribute values into canonical shapes so callers can reason about
 * id/htmlFor/aria attributes in a small set of cases.
 */
const getAttributeValueInfo = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>,
    attrName: string
): any => {
    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], attrName);

    // Prefer inspecting the AST expression container directly when present
    if (prop && prop.value && (prop.value as any).type === "JSXExpressionContainer") {
        const expr = (prop.value as any).expression;

        // Identifier: only accept valid JS identifiers (no hyphens, etc.)
        if (expr && expr.type === "Identifier") {
            if (typeof expr.name === "string" && validIdentifierRe.test(expr.name)) {
                return { kind: "identifier", name: expr.name as string };
            }
            return { kind: "none" };
        }

        // Expression container with a literal string: {"x"} or {'x'}
        if (expr && expr.type === "Literal" && typeof (expr as any).value === "string") {
            const trimmed = ((expr as any).value as string).trim();
            if (trimmed === "") return { kind: "empty" };
            return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/), exprText: JSON.stringify((expr as any).value) };
        }

        // BinaryExpression evaluation for constant concatenations only when composed of Literals.
        if (expr && expr.type === "BinaryExpression") {
            const v = evalConstantString(expr);
            if (typeof v === "string") {
                const trimmed = v.trim();
                if (trimmed === "") return { kind: "empty" };
                // Reconstruct a small source-like form for matching in raw source.
                const exprText = renderSimpleExprSource(expr);
                if (exprText) {
                    return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/), exprText };
                }
                return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/) };
            }
        }

        // TemplateLiteral: reconstruct a canonical template string (preserve literal parts and insert
        // ${name} placeholders for identifiers, ${} for unknown expressions).
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
                            // unknown expression placeholder — include empty placeholder
                            templateRaw += "${}";
                        }
                    }
                }
                templateRaw += "`";
                return { kind: "template", template: templateRaw };
            } catch {
                // If anything goes wrong, fall through to fallback.
            }
        }
    }

    // Fallback: try to resolve via getPropValue (covers literal attrs and some resolvable cases)
    const resolved = prop ? getPropValue(prop) : undefined;
    if (typeof resolved === "string") {
        const trimmed = resolved.trim();
        if (trimmed === "") return { kind: "empty" };
        return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/) };
    }

    return { kind: "none" };
};

/**
 * Look for an element with the given attribute written as a braced id: e.g. <Label id={foo}></Label>
 * Used as a narrow fallback for identifier-based matches.
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
 * Checks if a Label exists with htmlFor that matches idValue.
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
 * Generic helper for aria-* attributes.
 *
 * - For string-kind attributes we check label/other elements by raw token id and also
 *   attempt to match binary-constant expressions via exprText (when available).
 * - For identifier-kind attributes we look for braced identifier matches in the source.
 * - For template-kind attributes we build a flexible pattern that matches literal parts of the
 *   template while permitting any expression text inside ${...} placeholders.
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
            // If this string was produced by evaluating a BinaryExpression in the source,
            // attempt to match the exact binary-expression source in other element id attributes.
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
        const templ = info.template as string;
        const src = getSourceText(context);
        // Build a pattern which matches the template's literal parts but allows any expression
        // inside `${...}` placeholders. This lets templates with non-Identifier expressions
        // (e.g. `${a.b}`) match the canonicalized template produced from the AST.
        const placeholderRe = /\$\{[^}]*\}/g;
        let pattern = "";
        let idx = 0;
        let m: RegExpExecArray | null;
        while ((m = placeholderRe.exec(templ)) !== null) {
            pattern += escapeForRegExp(templ.slice(idx, m.index));
            pattern += "\\$\\{[^}]*\\}";
            idx = m.index + m[0].length;
        }
        pattern += escapeForRegExp(templ.slice(idx));
        const labelRe = new RegExp(`<(?:Label|label)[^>]*\\bid\\s*=\\s*\\{\\s*${pattern}\\s*\\}`, "i");
        const otherRe = new RegExp(`<(?:div|span|p|h[1-6])[^>]*\\bid\\s*=\\s*\\{\\s*${pattern}\\s*\\}`, "i");
        return labelRe.test(src) || otherRe.test(src);
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
        // primary: match literal/htmlFor forms
        if (hasLabelWithHtmlForId(info.raw, context)) return true;
        // fallback: match htmlFor written as a BinaryExpression / other expression that matches the same source text
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
        const templ = info.template as string;
        const src = getSourceText(context);
        // Build a pattern which matches the template's literal parts but allows any expression
        // inside `${...}` placeholders. This lets templates with non-Identifier expressions
        // (e.g. `${a.b}`) match the canonicalized template produced from the AST.
        const placeholderRe = /\$\{[^}]*\}/g;
        let pattern = "";
        let idx = 0;
        let m: RegExpExecArray | null;
        while ((m = placeholderRe.exec(templ)) !== null) {
            pattern += escapeForRegExp(templ.slice(idx, m.index));
            pattern += "\\$\\{[^}]*\\}";
            idx = m.index + m[0].length;
        }
        pattern += escapeForRegExp(templ.slice(idx));
        return new RegExp(`<(?:Label|label)[^>]*\\bhtmlFor\\s*=\\s*\\{\\s*${pattern}\\s*\\}`, "i").test(src);
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
