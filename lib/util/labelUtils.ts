// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { elementType } from "jsx-ast-utils";
import { getPropValue } from "jsx-ast-utils";
import { getProp } from "jsx-ast-utils";
import { TSESLint } from "@typescript-eslint/utils";
import { JSXOpeningElement } from "estree-jsx";
import { TSESTree } from "@typescript-eslint/utils";

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

/**
 * idOrExprRegex supports:
 *  - "double-quoted" and 'single-quoted' attribute values
 *  - expression containers with quoted strings:    htmlFor={"id"} or id={'id'}
 *  - expression containers with an Identifier:     htmlFor={someId} or id={someId}
 *
 * Capture groups (when the alternation matches) are in positions 2..6
 * (group 1 is the element/tag capture used in some surrounding regexes).
 */
const idLiteralDouble = '"([^"]*)"';
const idLiteralSingle = "'([^']*)'";
const exprStringDouble = '\\{\\s*"([^"]*)"\\s*\\}';
const exprStringSingle = "\\{\\s*'([^']*)'\\s*\\}";
const exprIdentifier = "\\{\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*\\}";

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
 * Small renderer to reconstruct simple expression source text for BinaryExpressions and Literals.
 * This provides a normalized textual form we can use to search the raw source for an exact expression match.
 * For strings, we preserve quotes by using JSON.stringify; numbers use String(value).
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
 * New small helper: normalize attribute value (string list vs identifier vs empty/none vs template)
 *
 * Return shapes:
 *   { kind: "string", raw: string, tokens: string[] }
 *   { kind: "identifier", name: string }
 *   { kind: "template", template: string } // template uses backticks and ${exprName} placeholders
 *   { kind: "empty" }
 *   { kind: "none" }
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

        // Identifier: only accept valid JS identifiers
        if (expr && expr.type === "Identifier") {
            if (typeof expr.name === "string" && validIdentifierRe.test(expr.name)) {
                return { kind: "identifier", name: expr.name as string };
            }
            return { kind: "none" };
        }

        // Literal inside expression container: {"x"} or {'x'}
        if (expr && expr.type === "Literal" && typeof (expr as any).value === "string") {
            const trimmed = ((expr as any).value as string).trim();
            if (trimmed === "") return { kind: "empty" };
            return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/), exprText: JSON.stringify((expr as any).value) };
        }

        // BinaryExpression evaluation for constant concatenations: {"my-" + "label"} or {"my-" + 1}
        if (expr && expr.type === "BinaryExpression") {
            const v = evalConstantString(expr);
            if (typeof v === "string") {
                const trimmed = v.trim();
                if (trimmed === "") return { kind: "empty" };
                // Reconstruct simple source for the binary expression so we can search for an exact occurrence in raw source
                const exprText = renderSimpleExprSource(expr);
                if (exprText) {
                    return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/), exprText };
                }
                return { kind: "string", raw: trimmed, tokens: trimmed.split(/\s+/) };
            }
        }

        // TemplateLiteral: reconstruct a canonical template string (preserve placeholders as ${name})
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
                // if anything goes wrong, fall through
            }
        }
    }

    // Fallback: try to resolve via getPropValue (covers literal attrs and expression-literals and other resolvable forms)
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
            // Fallback: if this string was produced by evaluating a BinaryExpression in the source,
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
        return new RegExp(`<(?:Label|label)[^>]*\\bhtmlFor\\s*=\\s*\\{\\s*${escapeForRegExp(templ)}\\s*\\}`, "i").test(src);
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
