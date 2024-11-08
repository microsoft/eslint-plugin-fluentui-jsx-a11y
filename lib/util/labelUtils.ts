// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { elementType } from "jsx-ast-utils";
import { getPropValue } from "jsx-ast-utils";
import { getProp } from "jsx-ast-utils";
import { hasNonEmptyProp } from "./hasNonEmptyProp";
import { TSESLint } from "@typescript-eslint/utils"; // Assuming context comes from TSESLint
import { JSXOpeningElement } from "estree-jsx";
import { TSESTree } from "@typescript-eslint/utils";

/**
 * Checks if the element is nested within a Label tag.
 * e.g.
 *       <Label>
 *           Sample input
 *           <Input {...props} />
 *       </Label>
 * @param {*} context
 * @returns
 */
const isInsideLabelTag = (context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    return context.getAncestors().some(node => {
        if (node.type !== "JSXElement") return false;
        const tagName = elementType(node.openingElement as unknown as JSXOpeningElement);
        return tagName.toLowerCase() === "label";
    });
};

/**
 * Checks if there is a Label component inside the source code with a htmlFor attribute matching that of the id parameter.
 * e.g.
 * id=parameter, <Label htmlFor={parameter}>Hello</Label>
 * @param {*} idValue
 * @param {*} context
 * @returns boolean for match found or not.
 */
const hasLabelWithHtmlForId = (idValue: string, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    if (idValue === "") {
        return false;
    }
    const sourceCode = context.getSourceCode();

    const regex = /<(Label|label)[^>]*\bhtmlFor\b\s*=\s*["{']([^"'{}]*)["'}]/gi;

    let match;
    while ((match = regex.exec(sourceCode.text)) !== null) {
        // `match[2]` contains the `htmlFor` attribute value
        if (match[2] === idValue) {
            return true;
        }
    }
    return false;
};

/**
 * Checks if there is a Label component inside the source code with an id matching that of the id parameter.
 * e.g.
 * id=parameter, <Label id={parameter}>Hello</Label>
 * @param {*} idValue value of the props id e.g. <Label id={'my-value'} />
 * @param {*} context
 * @returns boolean for match found or not.
 */
const hasLabelWithHtmlId = (idValue: string, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    if (idValue === "") {
        return false;
    }
    const sourceCode = context.getSourceCode();

    const regex = /<(Label|label)[^>]*\bid\b\s*=\s*["{']([^"'{}]*)["'}]/gi;

    let match;
    while ((match = regex.exec(sourceCode.text)) !== null) {
        // match[2] should contain the id value
        if (match[2] === idValue) {
            return true;
        }
    }
    return false;
};

/***
 * Checks if there is another element with an id matching that of the id parameter.
 *  * e.g.
 * <h2 id={labelId}>Sample input</h2>
 * <Input aria-labelledby={labelId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
const hasOtherElementWithHtmlId = (idValue: string, context: TSESLint.RuleContext<string, unknown[]>): boolean => {
    if (idValue === "") {
        return false;
    }
    const sourceCode: string = context.getSourceCode().text;

    // Adjusted regex pattern for elements with `id` attribute
    const regex = /<(div|span|p|h[1-6])[^>]*\bid\b\s*=\s*["{']([^"'{}]*)["'}]/gi;

    let match;
    while ((match = regex.exec(sourceCode)) !== null) {
        // `match[2]` contains the `id` value in each matched element
        if (match[2] === idValue) {
            return true;
        }
    }
    return false;
};

/**
 * Determines if the element has a label with the matching id associated with it via aria-labelledby.
 * e.g.
 * <Label id={labelId}>Sample input</Label>
 * <Input aria-labelledby={labelId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
const hasAssociatedLabelViaAriaLabelledBy = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>
): boolean => {
    const _hasAriaLabelledBy = hasNonEmptyProp(openingElement.attributes, "aria-labelledby");
    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], "aria-labelledby");

    // Check if the prop exists before passing it to getPropValue
    const idValue = prop ? getPropValue(prop) : undefined;

    // Check if idValue is a string and handle the case where it's not
    if (typeof idValue !== "string" || idValue.trim() === "") {
        return false;
    }

    const hasHtmlId = hasLabelWithHtmlId(idValue, context);
    const hasElementWithHtmlId = hasOtherElementWithHtmlId(idValue, context);

    return _hasAriaLabelledBy && (hasHtmlId || hasElementWithHtmlId);
};

/**
 * Determines if the element has a label with the matching id associated with it via aria-describedby.
 * e.g.
 * <Label id={labelId}>Sample input</Label>
 * <Input aria-describedby={labelId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
const hasAssociatedLabelViaAriaDescribedby = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>
): boolean => {
    const hasAssociatedLabelViaAriadescribedby = hasNonEmptyProp(openingElement.attributes, "aria-describedby");

    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], "aria-describedby");

    // Check if the prop exists before passing it to getPropValue
    const idValue = prop ? getPropValue(prop) : undefined;

    // Check if idValue is a string and handle the case where it's not
    if (typeof idValue !== "string" || idValue.trim() === "") {
        return false;
    }

    const hasHtmlId = hasLabelWithHtmlId(idValue, context);
    const hasElementWithHtmlId = hasOtherElementWithHtmlId(idValue, context);

    return hasAssociatedLabelViaAriadescribedby && (hasHtmlId || hasElementWithHtmlId);
};

/**
 * Determines if the element has a label associated with it via htmlFor
 * e.g.
 * <Label htmlFor={inputId}>Sample input</Label>
 * <Input id={inputId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
const hasAssociatedLabelViaHtmlFor = (openingElement: TSESTree.JSXOpeningElement, context: TSESLint.RuleContext<string, unknown[]>) => {
    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], "id");

    const idValue = prop ? getPropValue(prop) : undefined;

    // Check if idValue is a string and handle the case where it's not
    if (typeof idValue !== "string" || idValue.trim() === "") {
        return false;
    }

    return hasLabelWithHtmlForId(idValue, context);
};

/**
 * Determines if the element has a node with the matching id associated with it via the aria-attribute e.g. aria-describedby/aria-labelledby.
 * e.g.
 * <span id={labelI1}>Sample input Description</Label>
 * <Label id={labelId2}>Sample input label</Label>
 * <Input aria-describedby={labelId1} aria-labelledby={labelId2}/>
 * @param {*} openingElement
 * @param {*} context
 * @param {*} ariaAttribute
 * @returns boolean for match found or not.
 */
const hasAssociatedAriaText = (
    openingElement: TSESTree.JSXOpeningElement,
    context: TSESLint.RuleContext<string, unknown[]>,
    ariaAttribute: string
) => {
    const hasAssociatedAriaText = hasNonEmptyProp(openingElement.attributes, ariaAttribute);

    const prop = getProp(openingElement.attributes as unknown as JSXOpeningElement["attributes"], ariaAttribute);

    const idValue = prop ? getPropValue(prop) : undefined;

    let hasHtmlId = false;
    if (idValue) {
        const sourceCode = context.getSourceCode();

        const regex = /<(\w+)[^>]*id\s*=\s*["']([^"']*)["'][^>]*>/gi;
        let match;
        const ids = [];

        while ((match = regex.exec(sourceCode.text)) !== null) {
            ids.push(match[2]);
        }
        hasHtmlId = ids.some(id => id === idValue);
    }

    return hasAssociatedAriaText && hasHtmlId;
};

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
