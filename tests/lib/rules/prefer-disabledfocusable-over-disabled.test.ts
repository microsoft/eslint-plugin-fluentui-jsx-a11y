// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/prefer-disabledfocusable-over-disabled";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("prefer-disabledfocusable-over-disabled", rule as unknown as Rule.RuleModule, {
    valid: [
        // ✅ Correct usage: disabledFocusable with loading state
        "<Button disabledFocusable loading>Submit</Button>",
        "<Button disabledFocusable isLoading>Submit</Button>",
        "<ToggleButton disabledFocusable pending />",
        "<Checkbox disabledFocusable={true} loading={isLoading} />",
        "<Input disabledFocusable={disabled} busy={isBusy} />",

        // ✅ Acceptable: disabled without loading state
        "<Button disabled>Submit</Button>",
        "<Checkbox disabled />",
        "<Input disabled={true} />",
        "<SpinButton disabled={isDisabled} />",

        // ✅ Acceptable: loading state without disabled
        "<Button loading>Submit</Button>",
        "<SpinButton isLoading />",
        "<Combobox pending={isPending} />",
        "<Input busy />",

        // ✅ Acceptable: neither disabled nor loading
        "<Button>Submit</Button>",
        "<Checkbox />",
        "<Input />",

        // ✅ Non-applicable components (don't support disabledFocusable)
        "<div disabled loading>Content</div>",
        "<Label disabled loading>Label</Label>",
        "<Text disabled loading>Text</Text>",

        // ✅ Edge case: both disabledFocusable and disabled present (different rule concern)
        "<Button disabled disabledFocusable loading>Submit</Button>",

        // ✅ Complex expressions
        "<Button disabledFocusable={shouldDisable} loading={isSubmitting}>Submit</Button>",
        "<Input disabledFocusable={disabled && !error} isLoading={fetching} />",

        // ✅ All supported loading props
        "<Button disabledFocusable isPending>Submit</Button>",
        "<Button disabledFocusable isBusy>Submit</Button>",
        "<Button disabledFocusable busy>Submit</Button>"
    ],

    invalid: [
        // ❌ Basic cases
        {
            code: "<Button disabled loading>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable loading>Submit</Button>"
        },
        {
            code: "<ToggleButton disabled isLoading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<ToggleButton disabledFocusable isLoading />"
        },
        {
            code: "<Checkbox disabled pending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Checkbox disabledFocusable pending />"
        },

        // ❌ Boolean prop values
        {
            code: "<Button disabled={true} loading={true}>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={true} loading={true}>Submit</Button>"
        },
        {
            code: "<Input disabled={false} isLoading={processing} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable={false} isLoading={processing} />"
        },

        // ❌ Expression prop values
        {
            code: "<SpinButton disabled={isDisabled} loading={isSubmitting} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<SpinButton disabledFocusable={isDisabled} loading={isSubmitting} />"
        },
        {
            code: "<Combobox disabled={!isEnabled} pending={isPending} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Combobox disabledFocusable={!isEnabled} pending={isPending} />"
        },

        // ❌ Different loading prop variations
        {
            code: "<Button disabled isPending>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable isPending>Submit</Button>"
        },
        {
            code: "<Input disabled busy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable busy />"
        },
        {
            code: "<Slider disabled isBusy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Slider disabledFocusable isBusy />"
        },

        // ❌ Multiple loading props (should still trigger)
        {
            code: "<Button disabled loading pending>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable loading pending>Submit</Button>"
        },

        // ❌ Different component types
        {
            code: "<CompoundButton disabled loading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<CompoundButton disabledFocusable loading />"
        },
        {
            code: "<MenuButton disabled isLoading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<MenuButton disabledFocusable isLoading />"
        },
        {
            code: "<Switch disabled pending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Switch disabledFocusable pending />"
        },
        {
            code: "<Radio disabled loading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Radio disabledFocusable loading />"
        },
        {
            code: "<Textarea disabled busy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Textarea disabledFocusable busy />"
        },
        {
            code: "<DatePicker disabled isLoading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<DatePicker disabledFocusable isLoading />"
        },
        {
            code: "<TimePicker disabled pending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<TimePicker disabledFocusable pending />"
        },
        {
            code: "<Link disabled loading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Link disabledFocusable loading />"
        },
        {
            code: "<Tab disabled isPending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Tab disabledFocusable isPending />"
        }
    ]
});
