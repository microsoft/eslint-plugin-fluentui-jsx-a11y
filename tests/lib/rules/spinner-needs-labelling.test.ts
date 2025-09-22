// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/spinner-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("spinner-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        `<Spinner aria-label="my screen reader text" aria-live="polite" aria-busy="false" />`,
        `<Spinner appearance="primary" label="Primary Spinner" aria-label="his screen reader text" aria-live="polite" aria-busy="true" />`,
        `<Spinner appearance="primary" label="Secondary Spinner" aria-live="polite" aria-busy="false" />`,
        `<Spinner appearance="primary" aria-label="your screen reader text" aria-live="polite" aria-busy="true" />`
    ],
    invalid: [
        {
            code: `<Spinner />`,
            errors: [{ messageId: "noUnlabelledSpinner" }],
            output: `<Spinner aria-label="Loading" aria-live="polite" aria-busy="true" />`
        },
        {
            code: `<Spinner appearance="primary" label="Primary Spinner" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }],
            output: `<Spinner aria-live="polite" aria-busy="true" appearance="primary" label="Primary Spinner" />`
        },
        {
            code: `<Spinner size="large" aria-label="some text" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }],
            output: `<Spinner aria-live="polite" aria-busy="true" size="large" aria-label="some text" />`
        },
        {
            code: `<Spinner size="large" label="Large Spinner" aria-live="polite" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }],
            output: `<Spinner aria-busy="true" size="large" label="Large Spinner" aria-live="polite" />`
        },
        {
            code: `<Spinner size="large" label="Large Spinner" aria-busy="true" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }],
            output: `<Spinner aria-live="polite" size="large" label="Large Spinner" aria-busy="true" />`
        },
        {
            code: `<Spinner aria-label="my screen reader text" aria-live="polite" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }],
            output: `<Spinner aria-busy="true" aria-label="my screen reader text" aria-live="polite" />`
        }
    ]
});
