// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { hasNonEmptyProp } from "./hasNonEmptyProp";
import {
    hasAssociatedLabelViaAriaLabelledBy,
    isInsideLabelTag,
    hasAssociatedLabelViaHtmlFor,
    hasAssociatedLabelViaAriaDescribedby
} from "./labelUtils";
import { hasFieldParent } from "./hasFieldParent";
import { elementType } from "jsx-ast-utils";
import { JSXOpeningElement } from "estree-jsx";
import { hasToolTipParent } from "./hasTooltipParent";
import { hasLabeledChild } from "./hasLabeledChild";

export type LabeledControlConfig = {
    component: string | RegExp;
    messageId: string;
    description: string;
    labelProps: string[]; // e.g. ["aria-label", "title", "label"]
    /** Accept a parent <Field label="..."> wrapper as providing the label. */
    allowFieldParent: boolean; // default false
    allowHtmlFor: boolean /** Accept <label htmlFor="..."> association. */;
    allowLabelledBy: boolean /** Accept aria-labelledby association. */;
    allowWrappingLabel: boolean /** Accept being wrapped in a <label> element. */;
    allowTooltipParent: boolean /** Accept a parent <Tooltip content="..."> wrapper as providing the label. */;
    /**
     * Accept aria-describedby as a labeling strategy.
     * NOTE: This is discouraged for *primary* labeling; prefer text/aria-label/labelledby.
     * Keep this off unless a specific component (e.g., Icon-only buttons) intentionally uses it.
     */
    allowDescribedBy: boolean;
    // NEW: treat labeled child content (img alt, svg title, aria-label on role="img") as the name
    allowLabeledChild: boolean;
};

/**
 * Returns `true` if the JSX opening element is considered **accessibly labelled**
 * per the rule configuration. This centralizes all supported labeling strategies.
 *
 * Supported strategies (gated by config flags):
 *  1) Parent <Field label="..."> context .............................. (allowFieldParent)
 *  2) Non-empty inline prop(s) like aria-label/title .................. (labelProps)
 *  3) Wrapped by a <label> ............................................ (allowWrappingLabel)
 *  4) <label htmlFor="..."> / htmlFor association ..................... (allowFor)
 *  5) aria-labelledby association ..................................... (allowLabelledBy)
 *  6) Parent <Tooltip content="..."> context .......................... (allowTooltipParent)
 *  7) aria-describedby association (opt-in; discouraged as primary) .... (allowDescribedBy)
 *  8) treat labeled child content (img alt, svg title, aria-label on role="img") as the name
 *
 * This checks for presence of an accessible *name* only; not contrast or UX.
 */
export function hasAccessibleLabel(node: TSESTree.JSXOpeningElement, context: any, config: LabeledControlConfig): boolean {
    const allowFieldParent = !!config.allowFieldParent;
    const allowWrappingLabel = !!config.allowWrappingLabel;
    const allowHtmlFor = !!config.allowHtmlFor;
    const allowLabelledBy = !!config.allowLabelledBy;
    const allowTooltipParent = !!config.allowTooltipParent;
    const allowDescribedBy = !!config.allowDescribedBy;
    const allowLabeledChild = !!config.allowLabeledChild;

    if (allowFieldParent && hasFieldParent(context)) return true;
    if (config.labelProps?.some(p => hasNonEmptyProp(node.attributes, p))) return true;
    if (allowWrappingLabel && isInsideLabelTag(context)) return true;
    if (allowHtmlFor && hasAssociatedLabelViaHtmlFor(node, context)) return true;
    if (allowLabelledBy && hasAssociatedLabelViaAriaLabelledBy(node, context)) return true;
    if (allowTooltipParent && hasToolTipParent(context)) return true;
    if (allowDescribedBy && hasAssociatedLabelViaAriaDescribedby(node, context)) return true;
    if (allowLabeledChild && hasLabeledChild(node, context)) return true;

    return false;
}

/**
 * Factory for a minimal, strongly-configurable ESLint rule that enforces
 * accessible labeling on a specific JSX element/component.
 */
export function makeLabeledControlRule(config: LabeledControlConfig): TSESLint.RuleModule<string, []> {
    return {
        meta: {
            type: "problem",
            messages: { [config.messageId]: config.description },
            docs: {
                description: config.description,
                recommended: "strict",
                url: "https://www.w3.org/TR/html-aria/"
            },
            schema: []
        },
        defaultOptions: [],

        create(context: TSESLint.RuleContext<string, []>) {
            return {
                JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                    // elementType expects an ESTree JSX node — cast is fine
                    const name = elementType(node as unknown as JSXOpeningElement);
                    const matches = typeof config.component === "string" ? name === config.component : config.component.test(name);

                    if (!matches) return;

                    if (!hasAccessibleLabel(node, context, config)) {
                        context.report({ node, messageId: config.messageId });
                    }
                }
            };
        }
    };
}
