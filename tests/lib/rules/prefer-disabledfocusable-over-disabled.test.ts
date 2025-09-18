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
        "<CompoundButton disabled={false} />",
        "<ToggleButton disabled={isFormDisabled} />",

        // ✅ Acceptable: loading state without disabled
        "<Button loading>Submit</Button>",
        "<SpinButton isLoading />",
        "<Combobox pending={isPending} />",
        "<Input busy />",
        "<Textarea isPending />",
        "<Dropdown isBusy />",
        "<Slider loading={true} />",
        "<DatePicker isLoading={fetching} />",
        "<TimePicker pending={processing} />",

        // ✅ Acceptable: neither disabled nor loading
        "<Button>Submit</Button>",
        "<Checkbox />",
        "<Input />",
        "<CompoundButton />",
        "<MenuButton />",
        "<SplitButton />",
        "<Switch />",
        "<Radio />",
        "<Link />",
        "<Tab />",

        // ✅ Non-applicable components (don't support disabledFocusable)
        "<div disabled loading>Content</div>",
        "<Label disabled loading>Label</Label>",
        "<Text disabled loading>Text</Text>",
        "<span disabled isLoading>Span</span>",
        "<Accordion disabled loading />",
        "<Avatar disabled pending />",
        "<Badge disabled busy />",
        "<Breadcrumb disabled isLoading />",
        "<Card disabled pending />",
        "<Dialog disabled loading />",
        "<Divider disabled isLoading />",
        "<Field disabled pending />",
        "<Image disabled busy />",
        "<List disabled loading />",
        "<MessageBar disabled isLoading />",
        "<Nav disabled pending />",
        "<Popover disabled busy />",
        "<Portal disabled loading />",
        "<ProgressBar disabled isLoading />",
        "<Skeleton disabled pending />",
        "<Spinner disabled busy />",
        "<Toolbar disabled loading />",
        "<Tooltip disabled isLoading />",

        // ✅ Edge case: both disabledFocusable and disabled present (different rule concern)
        "<Button disabled disabledFocusable loading>Submit</Button>",
        "<Input disabled disabledFocusable isLoading />",
        "<Checkbox disabled={true} disabledFocusable={false} pending />",
        "<ToggleButton disabled={isDisabled} disabledFocusable={shouldFocus} busy />",

        // ✅ Complex expressions with disabledFocusable
        "<Button disabledFocusable={shouldDisable} loading={isSubmitting}>Submit</Button>",
        "<Input disabledFocusable={disabled && !error} isLoading={fetching} />",
        "<SpinButton disabledFocusable={!enabled || hasError} pending={processing} />",

        // ✅ All supported loading props with disabledFocusable
        "<Button disabledFocusable isPending>Submit</Button>",
        "<Button disabledFocusable isBusy>Submit</Button>",
        "<Button disabledFocusable busy>Submit</Button>",

        // ✅ Empty prop values that should be considered "empty" by hasNonEmptyProp
        '<Button disabled="" loading>Submit</Button>', // Empty string should not trigger
        "<Input disabled={null} isLoading />", // Null should not trigger
        "<Checkbox disabled={undefined} pending />", // Undefined should not trigger

        // ✅ Test all applicable components without issues
        "<Button>Normal Button</Button>",
        "<ToggleButton>Normal Toggle</ToggleButton>",
        "<CompoundButton>Normal Compound</CompoundButton>",
        "<MenuButton>Normal Menu</MenuButton>",
        "<SplitButton>Normal Split</SplitButton>",
        "<Checkbox>Normal Checkbox</Checkbox>",
        "<Radio>Normal Radio</Radio>",
        "<Switch>Normal Switch</Switch>",
        "<Input>Normal Input</Input>",
        "<Textarea>Normal Textarea</Textarea>",
        "<Combobox>Normal Combobox</Combobox>",
        "<Dropdown>Normal Dropdown</Dropdown>",
        "<SpinButton>Normal SpinButton</SpinButton>",
        "<Slider>Normal Slider</Slider>",
        "<DatePicker>Normal DatePicker</DatePicker>",
        "<TimePicker>Normal TimePicker</TimePicker>",
        "<Link>Normal Link</Link>",
        "<Tab>Normal Tab</Tab>",

        // ✅ Test components with different casing variations
        "<button disabled loading>Submit</button>", // lowercase (should not trigger - not a FluentUI component)
        "<BUTTON disabled loading>Submit</BUTTON>", // uppercase (should not trigger - not a FluentUI component)

        // ✅ Cases where loading props are truly empty (null, undefined, empty string)
        '<Input disabled={true} isLoading="">Submit</Input>', // loading is empty string
        "<Checkbox disabled={true} pending={null} />", // loading is null
        "<SpinButton disabled={true} busy={undefined} />", // loading is undefined

        // ✅ Cases where only one prop exists (no combination to trigger rule)
        "<Button disabled={(() => false)()}>Submit</Button>", // only disabled, no loading
        "<Input isLoading={status === 'loading'} />", // only loading, no disabled
        "<Checkbox loading={(() => true)()} />", // only loading, no disabled
        "<ToggleButton disabled={isDisabled ? false : true} />", // only disabled, no loading

        // ✅ JSXSpreadAttribute cases without both props
        "<Button {...props} disabled={false}>Submit</Button>", // only disabled, no loading
        "<Input {...buttonProps} isLoading={1} />", // only loading, no disabled

        // ✅ Cases where disabled has truly empty values
        '<Button disabled="" loading={false}>Submit</Button>', // disabled is empty string (should not trigger because disabled is empty)
        "<Input disabled={null} loading={true} />", // disabled is null (should not trigger because disabled is empty)
        "<Checkbox disabled={undefined} pending={true} />" // disabled is undefined (should not trigger because disabled is empty)
    ],

    invalid: [
        // ❌ Basic cases - test messageId: "preferDisabledFocusable"
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

        // ❌ Boolean prop values (ALL boolean values are considered "non-empty" by hasNonEmptyProp)
        {
            code: "<Button disabled={true} loading={true}>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={true} loading={true}>Submit</Button>"
        },
        {
            code: "<Button disabled={true} loading={false}>Submit</Button>", // MOVED FROM VALID - false is still non-empty!
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={true} loading={false}>Submit</Button>"
        },
        {
            code: "<Input disabled={false} isLoading={processing} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable={false} isLoading={processing} />"
        },

        // ❌ Cases that were incorrectly in valid section (hasNonEmptyProp treats these as non-empty)
        {
            code: "<Button disabled={(() => false)()} loading={(() => true)()}>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={(() => false)()} loading={(() => true)()}>Submit</Button>"
        },
        {
            code: "<Input disabled={isDisabled ? false : true} isLoading={status === 'loading'} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable={isDisabled ? false : true} isLoading={status === 'loading'} />"
        },
        {
            code: "<Button {...props} disabled={false} loading>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button {...props} disabledFocusable={false} loading>Submit</Button>"
        },
        {
            code: "<Input {...buttonProps} disabled loading={false} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input {...buttonProps} disabledFocusable loading={false} />"
        },
        {
            code: "<Button disabled={0} loading>Submit</Button>", // 0 is considered non-empty
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={0} loading>Submit</Button>"
        },
        {
            code: "<Input disabled={false} isLoading={1} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable={false} isLoading={1} />"
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

        // ❌ Test all loading prop variations
        {
            code: "<Button disabled loading>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable loading>Submit</Button>"
        },
        {
            code: "<Button disabled isLoading>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable isLoading>Submit</Button>"
        },
        {
            code: "<Button disabled pending>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable pending>Submit</Button>"
        },
        {
            code: "<Button disabled isPending>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable isPending>Submit</Button>"
        },
        {
            code: "<Button disabled busy>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable busy>Submit</Button>"
        },
        {
            code: "<Button disabled isBusy>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable isBusy>Submit</Button>"
        },

        // ❌ Multiple loading props (should still trigger)
        {
            code: "<Button disabled loading pending>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable loading pending>Submit</Button>"
        },
        {
            code: "<Input disabled isLoading busy pending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable isLoading busy pending />"
        },

        // ❌ Test all applicable component types
        {
            code: "<Button disabled loading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable loading />"
        },
        {
            code: "<ToggleButton disabled isLoading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<ToggleButton disabledFocusable isLoading />"
        },
        {
            code: "<CompoundButton disabled pending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<CompoundButton disabledFocusable pending />"
        },
        {
            code: "<MenuButton disabled isPending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<MenuButton disabledFocusable isPending />"
        },
        {
            code: "<SplitButton disabled busy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<SplitButton disabledFocusable busy />"
        },
        {
            code: "<Checkbox disabled isBusy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Checkbox disabledFocusable isBusy />"
        },
        {
            code: "<Radio disabled loading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Radio disabledFocusable loading />"
        },
        {
            code: "<Switch disabled isLoading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Switch disabledFocusable isLoading />"
        },
        {
            code: "<Input disabled pending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable pending />"
        },
        {
            code: "<Textarea disabled isPending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Textarea disabledFocusable isPending />"
        },
        {
            code: "<Combobox disabled busy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Combobox disabledFocusable busy />"
        },
        {
            code: "<Dropdown disabled isBusy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Dropdown disabledFocusable isBusy />"
        },
        {
            code: "<SpinButton disabled loading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<SpinButton disabledFocusable loading />"
        },
        {
            code: "<Slider disabled isLoading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Slider disabledFocusable isLoading />"
        },
        {
            code: "<DatePicker disabled pending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<DatePicker disabledFocusable pending />"
        },
        {
            code: "<TimePicker disabled isPending />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<TimePicker disabledFocusable isPending />"
        },
        {
            code: "<Link disabled busy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Link disabledFocusable busy />"
        },
        {
            code: "<Tab disabled isBusy />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Tab disabledFocusable isBusy />"
        },

        // ❌ Complex expressions with all components
        {
            code: "<Button disabled={isSubmitting} loading={fetchingData}>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={isSubmitting} loading={fetchingData}>Submit</Button>"
        },
        {
            code: "<Input disabled={!isEnabled && hasValidation} pending={validating} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable={!isEnabled && hasValidation} pending={validating} />"
        },
        {
            code: "<Checkbox disabled={shouldDisable || isReadonly} busy={processing} />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Checkbox disabledFocusable={shouldDisable || isReadonly} busy={processing} />"
        },

        // ❌ Test more complex expression scenarios
        {
            code: "<Button disabled={isSubmitting || hasError} loading={status === 'pending'}>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={isSubmitting || hasError} loading={status === 'pending'}>Submit</Button>"
        },

        // ❌ Additional test cases to ensure full coverage
        {
            code: "<Button disabled={true} loading>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={true} loading>Submit</Button>"
        },

        // ❌ Test edge cases for fix function coverage
        {
            code: "<Button disabled={1} loading={true}>Submit</Button>", // truthy number
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={1} loading={true}>Submit</Button>"
        },
        {
            code: "<Input disabled={'true'} isLoading={'false'} />", // string values
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable={'true'} isLoading={'false'} />"
        },

        // ❌ Test JSXSpreadAttribute with invalid cases
        {
            code: "<Button {...props} disabled loading>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button {...props} disabledFocusable loading>Submit</Button>"
        },
        {
            code: "<Input disabled {...inputProps} isLoading />",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Input disabledFocusable {...inputProps} isLoading />"
        },

        // ❌ Test cases where fix function edge cases might be triggered
        {
            code: "<Button disabled={variable} pending={anotherVariable}>Submit</Button>",
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={variable} pending={anotherVariable}>Submit</Button>"
        },

        // ❌ Test more combinations to increase coverage
        {
            code: "<Combobox disabled={true} loading={true} pending={false} />", // Multiple loading props
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Combobox disabledFocusable={true} loading={true} pending={false} />"
        },

        // ❌ Edge case: Test with numeric and other literal values
        {
            code: "<Button disabled={42} loading={-1}>Submit</Button>", // Numeric values
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: "<Button disabledFocusable={42} loading={-1}>Submit</Button>"
        },

        // ❌ Test string prop values that are non-empty
        {
            code: '<Button disabled="true" loading="false">Submit</Button>',
            errors: [{ messageId: "preferDisabledFocusable" }],
            output: '<Button disabledFocusable="true" loading="false">Submit</Button>'
        }
    ]
});
