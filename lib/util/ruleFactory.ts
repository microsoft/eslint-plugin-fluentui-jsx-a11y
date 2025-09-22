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
import { hasDefinedProp } from "./hasDefinedProp";
import { hasTextContentChild } from "./hasTextContentChild";
import { hasTriggerProp } from "./hasTriggerProp";

/**
 * Auto-fix strategy types for accessibility rules
 */
export type AutoFixStrategy =
    | "aria-label-placeholder" // Add aria-label=""
    | "aria-label-suggestion" // Add aria-label="[Component description]"
    | "add-required-prop" // Add specific required prop
    | "custom"; // Custom fix logic

/**
 * Auto-fix configuration for accessibility rules
 */
export type AutoFixConfig = {
    /** The auto-fix strategy to use */
    strategy: AutoFixStrategy;
    /** For add-required-prop: the prop name to add */
    propName?: string;
    /** For add-required-prop: the default prop value */
    propValue?: string;
    /** For aria-label-suggestion: the suggested label text */
    suggestedLabel?: string;
    /** For custom: custom fix function */
    // eslint-disable-next-line no-unused-vars
    customFix?: (opening: TSESTree.JSXOpeningElement) => string;
};

/**
 * Configuration options for a rule created via the `ruleFactory`
 */
export type LabeledControlConfig = {
    /** The name of the component that the rule applies to. @example 'Image', /Image|Icon/ */
    component: string | RegExp;
    /** The unique id of the problem message. @example 'itemNeedsLabel' */
    messageId: string;
    /** A short description of the rule. */
    description: string;
    /** Properties that are required to have a non-`null` and non-`undefined` value. @example ["alt"] */
    requiredProps?: string[];
    /** Labeling properties that are required to have at least one non-empty value. @example ["aria-label", "title", "label"] */
    labelProps?: string[];
    /** Accept a parent `<Field label="...">` wrapper as providing the label. */
    allowFieldParent: boolean;
    /** Accept `<label htmlFor="...">` association. */
    allowHtmlFor: boolean;
    /** Accept aria-labelledby association. */
    allowLabelledBy: boolean;
    /** Accept being wrapped in a `<label>` element. */
    allowWrappingLabel: boolean;
    /** Accept a parent `<Tooltip content="...">` wrapper as providing the label. */
    allowTooltipParent: boolean;
    /**
     * Accept aria-describedby as a labeling strategy.
     * NOTE: This is discouraged for *primary* labeling; prefer text/aria-label/labelledby.
     * Keep this off unless a specific component (e.g., Icon-only buttons) intentionally uses it.
     */
    allowDescribedBy: boolean;
    allowLabeledChild: boolean; // Accept labeled child elements to provide the label e.g. <Button><img alt="..." /></Button>
    allowTextContentChild?: boolean; // Accept text children to provide the label e.g. <Button>Click me</Button>
    triggerProp?: string; // Only apply rule when this trigger prop is present (e.g., "dismissible", "disabled")
    customValidator?: Function; // Custom validation logic
    autoFix?: AutoFixConfig; // Auto-fix configuration for the rule
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
 *  9) Conditional application based on trigger prop ................... (triggerProp)
 * 10) Custom validation for complex scenarios ......................... (customValidator)
 *
 * This checks for presence of an accessible *name* only; not contrast or UX.
 */
export function hasAccessibleLabel(
    opening: TSESTree.JSXOpeningElement,
    element: TSESTree.JSXElement,
    context: TSESLint.RuleContext<string, []>,
    config: LabeledControlConfig
): boolean {
    const {
        allowFieldParent,
        allowWrappingLabel,
        allowHtmlFor,
        allowLabelledBy,
        allowTooltipParent,
        allowDescribedBy,
        allowLabeledChild,
        requiredProps,
        labelProps
    } = config;
    const allowTextContentChild = !!config.allowTextContentChild;

    if (allowFieldParent && hasFieldParent(context)) return true;
    if (requiredProps?.every(p => hasDefinedProp(opening.attributes, p))) return true;
    if (labelProps?.some(p => hasNonEmptyProp(opening.attributes, p))) return true;
    if (allowWrappingLabel && isInsideLabelTag(context)) return true;
    if (allowHtmlFor && hasAssociatedLabelViaHtmlFor(opening, context)) return true;
    if (allowLabelledBy && hasAssociatedLabelViaAriaLabelledBy(opening, context)) return true;
    if (allowTooltipParent && hasToolTipParent(context)) return true;
    if (allowDescribedBy && hasAssociatedLabelViaAriaDescribedby(opening, context)) return true;
    if (allowLabeledChild && hasLabeledChild(opening, context)) return true;
    if (allowTextContentChild && hasTextContentChild(element)) return true;
    return false;
}

/**
 * Generate auto-fix for accessibility rules based on configuration
 */
export function generateAutoFix(opening: TSESTree.JSXOpeningElement, config: AutoFixConfig): TSESLint.ReportFixFunction | null {
    if (!config) return null;

    return (fixer: TSESLint.RuleFixer) => {
        switch (config.strategy) {
            case "aria-label-placeholder": {
                return fixer.insertTextAfter(opening.name, ' aria-label=""');
            }

            case "aria-label-suggestion": {
                const label = config.suggestedLabel || "Provide accessible name";
                return fixer.insertTextAfter(opening.name, ` aria-label="${label}"`);
            }

            case "add-required-prop": {
                if (!config.propName) return null;
                const value = config.propValue || '""';
                return fixer.insertTextAfter(opening.name, ` ${config.propName}=${value}`);
            }

            case "custom": {
                if (!config.customFix) return null;
                const fixText = config.customFix(opening);
                return fixer.insertTextAfter(opening.name, fixText);
            }

            default:
                return null;
        }
    };
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
            fixable: config.autoFix ? "code" : undefined,
            schema: []
        },
        defaultOptions: [],

        create(context: TSESLint.RuleContext<string, []>) {
            return {
                JSXElement(node: TSESTree.JSXElement) {
                    const opening = node.openingElement;
                    const name = elementType(opening as unknown as JSXOpeningElement);
                    const matches = typeof config.component === "string" ? name === config.component : config.component.test(name);

                    if (!matches) return;

                    if (config.triggerProp && !hasTriggerProp(opening, config.triggerProp)) {
                        return;
                    }

                    // Use custom validator if provided, otherwise use standard accessibility check
                    let isValid: boolean;
                    config.customValidator
                        ? (isValid = config.customValidator(opening))
                        : (isValid = hasAccessibleLabel(opening, node, context, config));

                    if (!isValid) {
                        // Generate auto-fix if configuration is provided
                        const autoFix = config.autoFix ? generateAutoFix(opening, config.autoFix) : undefined;

                        // report on the opening tag for better location
                        context.report({
                            node: opening,
                            messageId: config.messageId,
                            fix: autoFix
                        });
                    }
                }
            };
        }
    };
}
