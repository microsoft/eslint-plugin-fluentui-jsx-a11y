// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

jest.mock("../../../../lib/util/hasNonEmptyProp", () => ({
    hasNonEmptyProp: jest.fn()
}));
jest.mock("../../../../lib/util/labelUtils", () => ({
    hasAssociatedLabelViaAriaDescribedby: jest.fn(),
    hasAssociatedLabelViaAriaLabelledBy: jest.fn(),
    isInsideLabelTag: jest.fn(),
    hasAssociatedLabelViaHtmlFor: jest.fn()
}));
jest.mock("../../../../lib/util/hasFieldParent", () => ({
    hasFieldParent: jest.fn()
}));
jest.mock("../../../../lib/util/hasLabeledChild", () => ({
    hasLabeledChild: jest.fn()
}));

import { hasNonEmptyProp } from "../../../../lib/util/hasNonEmptyProp";
import {
    hasAssociatedLabelViaAriaLabelledBy,
    isInsideLabelTag,
    hasAssociatedLabelViaHtmlFor,
    hasAssociatedLabelViaAriaDescribedby
} from "../../../../lib/util/labelUtils";
import { hasFieldParent } from "../../../../lib/util/hasFieldParent";

// Import the module under test AFTER mocks
import { hasAccessibleLabel, LabeledControlConfig, makeLabeledControlRule } from "../../../../lib/util/ruleFactory";
import type { TSESTree } from "@typescript-eslint/utils";
import { Rule, RuleTester } from "eslint";
import { hasLabeledChild } from "../../../../lib/util/hasLabeledChild";

// Helper: reset all mocks to a default "false" stance
const resetAllMocksToFalse = () => {
    (hasNonEmptyProp as jest.Mock).mockReset().mockReturnValue(false);
    (hasAssociatedLabelViaAriaLabelledBy as jest.Mock).mockReset().mockReturnValue(false);
    (hasAssociatedLabelViaAriaDescribedby as jest.Mock).mockReset().mockReturnValue(false);
    (isInsideLabelTag as jest.Mock).mockReset().mockReturnValue(false);
    (hasAssociatedLabelViaHtmlFor as jest.Mock).mockReset().mockReturnValue(false);
    (hasFieldParent as jest.Mock).mockReset().mockReturnValue(false);
    (hasLabeledChild as jest.Mock).mockReset().mockReturnValue(false);
};

beforeEach(() => {
    resetAllMocksToFalse();
});

// Small helper to create a minimal JSXOpeningElement node when directly unit testing
function makeOpeningElement(name: string, attributes: Array<Partial<TSESTree.JSXAttribute>> = []): TSESTree.JSXOpeningElement {
    return {
        type: AST_NODE_TYPES.JSXOpeningElement,
        name: { type: "JSXIdentifier", name } as any,
        attributes: (attributes as any) ?? [],
        selfClosing: true,
        typeParameters: undefined,
        range: [0, 0],
        loc: {} as any
    };
}

/* -------------------------------------------------------------------------- */
/*                          Unit tests: hasAccessibleLabel                     */
/* -------------------------------------------------------------------------- */

describe("hasAccessibleLabel (unit)", () => {
    const cfg: LabeledControlConfig = {
        component: "RadioGroup",
        labelProps: ["label", "aria-label"],
        allowFieldParent: true,
        allowHtmlFor: true,
        allowLabelledBy: true,
        allowWrappingLabel: true,
        allowTooltipParent: false,
        allowDescribedBy: true,
        messageId: "errorMsg",
        description: "anything",
        allowLabeledChild: false
    };

    test("returns false when no heuristics pass", () => {
        const node = makeOpeningElement("RadioGroup");
        const ctx = {};
        expect(hasAccessibleLabel(node, ctx, cfg)).toBe(false);
    });

    test("true when allowFieldParent and hasFieldParent(ctx) === true", () => {
        (hasFieldParent as jest.Mock).mockReturnValue(true);
        const node = makeOpeningElement("RadioGroup");
        expect(hasAccessibleLabel(node, {}, cfg)).toBe(true);
    });

    test("true when a label prop is non-empty via hasNonEmptyProp", () => {
        (hasNonEmptyProp as jest.Mock).mockImplementation((attrs, name) => (name === "label" ? true : false));
        const node = makeOpeningElement("RadioGroup", [
            {
                type: AST_NODE_TYPES.JSXAttribute,
                name: { type: AST_NODE_TYPES.JSXIdentifier, name: "label", range: [0, 0], loc: {} as any }
            }
        ]);
        expect(hasAccessibleLabel(node, {}, cfg)).toBe(true);
    });

    test("true when allowWrappingLabel and isInsideLabelTag(ctx) === true", () => {
        (isInsideLabelTag as jest.Mock).mockReturnValue(true);
        const node = makeOpeningElement("RadioGroup");
        expect(hasAccessibleLabel(node, {}, cfg)).toBe(true);
    });

    test("true when allowFor and hasAssociatedLabelViaHtmlFor(...) === true", () => {
        (hasAssociatedLabelViaHtmlFor as jest.Mock).mockReturnValue(true);
        const node = makeOpeningElement("RadioGroup");
        expect(hasAccessibleLabel(node, {}, cfg)).toBe(true);
    });

    test("true when allowLabelledBy and hasAssociatedLabelViaAriaLabelledBy(...) === true", () => {
        (hasAssociatedLabelViaAriaLabelledBy as jest.Mock).mockReturnValue(true);
        const node = makeOpeningElement("RadioGroup");
        expect(hasAccessibleLabel(node, {}, cfg)).toBe(true);
    });

    test("true when allowDescribedByBy and hasAssociatedLabelViaAriaDescribedBy(...) === true", () => {
        (hasAssociatedLabelViaAriaDescribedby as jest.Mock).mockReturnValue(true);
        const node = makeOpeningElement("RadioGroup");
        expect(hasAccessibleLabel(node, {}, cfg)).toBe(true);
    });
});

/* -------------------------------------------------------------------------- */
/*                  Integration tests: makeLabeledControlRule                  */
/* -------------------------------------------------------------------------- */

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } } });

describe("makeLabeledControlRule (RuleTester integration)", () => {
    const baseCfg: LabeledControlConfig = {
        component: "RadioGroup",
        labelProps: ["label", "aria-label"],
        allowFieldParent: true,
        allowHtmlFor: true,
        allowLabelledBy: true,
        allowWrappingLabel: true,
        allowTooltipParent: false,
        allowDescribedBy: true,
        messageId: "noUnlabeledRadioGroup",
        description: "Accessibility: RadioGroup must have a programmatic and visual label.",
        allowLabeledChild: false
    };

    // 1) No heuristics -> report
    describe("reports when component matches and no label heuristics pass", () => {
        beforeEach(() => resetAllMocksToFalse());
        const rule = makeLabeledControlRule(baseCfg);

        ruleTester.run("no-unlabeled-radio-group", rule as unknown as Rule.RuleModule, {
            valid: [],
            invalid: [
                {
                    code: `<RadioGroup />`,
                    errors: [{ messageId: baseCfg.messageId }]
                }
            ]
        });
    });

    // 2) label/aria-label present -> valid
    describe("accepts when label prop is present", () => {
        beforeEach(() => {
            resetAllMocksToFalse();
            (hasNonEmptyProp as jest.Mock).mockImplementation(
                (attrs: any[], name: string) =>
                    Array.isArray(attrs) && attrs.some((a: any) => a?.type === "JSXAttribute" && a?.name?.name === name && a.value != null)
            );
        });

        const rule = makeLabeledControlRule(baseCfg);

        ruleTester.run("no-unlabeled-radio-group (label prop)", rule as unknown as Rule.RuleModule, {
            valid: [{ code: `<RadioGroup label="Account type" />` }, { code: `<RadioGroup aria-label={"Account type"} />` }],
            invalid: []
        });
    });

    // 3) aria-labelledby present -> valid
    describe("accepts when aria-labelledby is present", () => {
        beforeEach(() => {
            resetAllMocksToFalse();
            (hasAssociatedLabelViaAriaLabelledBy as jest.Mock).mockImplementation(
                (node: any) =>
                    Array.isArray(node?.attributes) &&
                    node.attributes.some((a: any) => a?.type === "JSXAttribute" && a?.name?.name === "aria-labelledby")
            );
        });

        const rule = makeLabeledControlRule(baseCfg);

        ruleTester.run("no-unlabeled-radio-group (aria-labelledby)", rule as unknown as Rule.RuleModule, {
            valid: [{ code: `<RadioGroup aria-labelledby="groupLabelId" />` }],
            invalid: [{ code: `<RadioGroup />`, errors: [{ messageId: baseCfg.messageId }] }]
        });
    });

    // 4) non-matching component -> ignored
    describe("does not report for non-matching component names", () => {
        beforeEach(() => resetAllMocksToFalse());
        const rule = makeLabeledControlRule(baseCfg);

        ruleTester.run("no-unlabeled-radio-group (non-matching)", rule as unknown as Rule.RuleModule, {
            valid: [{ code: `<Dropdown />` }],
            invalid: []
        });
    });

    // 5) RegExp component match
    describe("supports RegExp component config (/Group$/)", () => {
        beforeEach(() => resetAllMocksToFalse());
        const rule = makeLabeledControlRule({ ...baseCfg, component: /Group$/ });

        ruleTester.run("no-unlabeled-*Group (regex)", rule as unknown as Rule.RuleModule, {
            valid: [],
            invalid: [
                {
                    code: `<CheckboxGroup />`,
                    errors: [{ messageId: baseCfg.messageId }]
                }
            ]
        });
    });

    // 6) parent Field label
    describe("accepts when parent Field provides label", () => {
        beforeEach(() => {
            resetAllMocksToFalse();
            (hasFieldParent as jest.Mock).mockReturnValue(true);
        });

        const rule = makeLabeledControlRule(baseCfg);

        ruleTester.run("no-unlabeled-radio-group (Field parent)", rule as unknown as Rule.RuleModule, {
            valid: [
                {
                    code: `
                        <>
                        <Field label="Account type">
                            <RadioGroup />
                        </Field>
                        </>
                    `
                }
            ],
            invalid: []
        });
    });

    // 7) wrapped by <label>
    describe("accepts when inside <label>…</label>", () => {
        beforeEach(() => {
            resetAllMocksToFalse();
            (isInsideLabelTag as jest.Mock).mockReturnValue(true);
        });

        const rule = makeLabeledControlRule(baseCfg);

        ruleTester.run("no-unlabeled-radio-group (wrapping <label>)", rule as unknown as Rule.RuleModule, {
            valid: [
                {
                    code: `
                        <label>
                            <RadioGroup />
                        </label>
                    `
                }
            ],
            invalid: []
        });
    });

    // 8) in rare cases
    describe("accepts when aria-describedby is present", () => {
        beforeEach(() => {
            resetAllMocksToFalse();
            (hasAssociatedLabelViaAriaDescribedby as jest.Mock).mockImplementation(
                (node: any) =>
                    Array.isArray(node?.attributes) &&
                    node.attributes.some((a: any) => a?.type === "JSXAttribute" && a?.name?.name === "aria-describedby")
            );
        });

        const rule = makeLabeledControlRule(baseCfg);

        ruleTester.run("no-unlabeled-radio-group (aria-describedby)", rule as unknown as Rule.RuleModule, {
            valid: [{ code: `<RadioGroup aria-describedby="groupLabelId" />` }],
            invalid: [{ code: `<RadioGroup />`, errors: [{ messageId: baseCfg.messageId }] }]
        });
    });
});
