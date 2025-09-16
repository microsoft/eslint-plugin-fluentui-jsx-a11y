// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { hasNonEmptyProp } from "./hasNonEmptyProp";
import { hasAssociatedLabelViaAriaLabelledBy, isInsideLabelTag, hasAssociatedLabelViaHtmlFor } from "./labelUtils";
import { hasFieldParent } from "./hasFieldParent";
import { elementType } from "jsx-ast-utils";
import { JSXOpeningElement } from "estree-jsx";

export type LabeledControlConfig = {
    component: string | RegExp;
    labelProps: string[]; // e.g. ["label", "aria-label"]
    allowFieldParent?: boolean; // e.g. <Field label=...><RadioGroup/></Field>
    allowFor?: boolean; // htmlFor
    allowLabelledBy?: boolean; // aria-labelledby
    allowWrappingLabel?: boolean; // <label>...</label>
};

/**
 * Returns `true` if the JSX opening element is considered **accessibly labelled**
 * per the rule configuration. This function centralizes all supported labelling
 * strategies so the rule stays small and testable.
 *
 * The supported strategies (gated by `config` flags) are:
 *  1) A parent `<Field>`-like wrapper that provides the label context (`allowFieldParent`).
 *  2) A non-empty inline prop such as `aria-label` or `title` (`labelProps`).
 *  3) Being wrapped by a `<label>` element (`allowWrappingLabel`).
 *  4) Associated `<label for="...">` / `htmlFor` relation (`allowFor`).
 *  5) `aria-labelledby` association to an element with textual content (`allowLabelledBy`).
 *
 * Note: This does not validate contrast or UX; it only checks the existence of
 * an accessible **name** via common HTML/ARIA labelling patterns.
 *
 * @param node - The JSX opening element we’re inspecting (e.g., `<Input ...>` opening node).
 * @param context - ESLint rule context or tree-walker context used by helper functions to
 *              resolve scope/ancestors and collect referenced nodes.
 * @param config - Rule configuration describing which components/props/associations count as labelled.
 *              Expected shape:
 *              - `component: string | RegExp` — component tag name or regex to match.
 *              - `labelProps: string[]` — prop names that, when non-empty, count as labels (e.g., `["aria-label","title"]`).
 *              - `allowFieldParent?: boolean` — if true, a recognized parent “Field” wrapper satisfies labelling.
 *              - `allowWrappingLabel?: boolean` — if true, being inside a `<label>` satisfies labelling.
 *              - `allowFor?: boolean` — if true, `<label htmlFor>` association is considered.
 *              - `allowLabelledBy?: boolean` — if true, `aria-labelledby` association is considered.
 * @returns `true` if any configured labelling strategy succeeds; otherwise `false`.
 */
export function hasAccessibleLabel(node: TSESTree.JSXOpeningElement, context: any, config: LabeledControlConfig): boolean {
    if (config.allowFieldParent && hasFieldParent(context)) return true;
    if (config.labelProps.some(p => hasNonEmptyProp(node.attributes, p))) return true;
    if (config.allowWrappingLabel && isInsideLabelTag(context)) return true;
    if (config.allowFor && hasAssociatedLabelViaHtmlFor(node, context)) return true;
    if (config.allowLabelledBy && hasAssociatedLabelViaAriaLabelledBy(node, context)) return true;
    return false;
}

/**
 * Factory for a minimal, strongly-configurable ESLint rule that enforces
 * accessible labelling on a specific JSX element/component.
 *
 * The rule:
 *  • Matches opening elements by `config.component` (exact name or RegExp).
 *  • Uses `hasAccessibleLabel` to decide whether the element is labelled.
 *  • Reports with `messageId` if no labelling strategy succeeds.
 *
 * Example:
 * ```ts
 * export default makeLabeledControlRule(
 *   {
 *     component: /^(?:input|textarea|Select|ComboBox)$/i,
 *     labelProps: ["aria-label", "aria-labelledby", "title"],
 *     allowFieldParent: true,
 *     allowWrappingLabel: true,
 *     allowFor: true,
 *     allowLabelledBy: true,
 *   },
 *   "missingLabel",
 *   "Provide an accessible label (e.g., via <label>, htmlFor, aria-label, or aria-labelledby)."
 * );
 * ```
 *
 * @param config - See `hasAccessibleLabel` for the configuration fields and semantics.
 * @param messageId - The message key used in `meta.messages` (e.g., "missingLabel").
 * @param description - Human-readable rule description and the text displayed for `messageId`.
 * @returns An ESLint `RuleModule` that reports when the configured component lacks an accessible label.
 */
export function makeLabeledControlRule(
    config: LabeledControlConfig,
    messageId: string,
    description: string
): TSESLint.RuleModule<string, []> {
    return {
        meta: {
            type: "problem" as const,
            messages: { [messageId]: description },
            docs: {
                description,
                recommended: "strict" as const, // not `true`
                url: "https://www.w3.org/TR/html-aria/"
            },
            schema: []
        },
        defaultOptions: [] as const,

        create(context: TSESLint.RuleContext<string, []>) {
            return {
                JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                    // elementType expects an ESTree JSX node — cast is fine
                    const name = elementType(node as unknown as JSXOpeningElement);
                    const matches = typeof config.component === "string" ? name === config.component : config.component.test(name);

                    if (!matches) return;

                    if (!hasAccessibleLabel(node, context, config)) {
                        context.report({ node, messageId });
                    }
                }
            };
        }
    };
}
