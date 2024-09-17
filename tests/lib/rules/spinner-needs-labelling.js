// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/spinner-needs-labelling"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("spinner-needs-labelling", rule, {
    valid: [
        `<Spinner aria-label="my screen reader text" aria-live="polite" aria-busy="false" />`,
        `<Spinner appearance="primary" label="Primary Spinner" aria-label="his screen reader text" aria-live="polite" aria-busy="true" />`,
        `<Spinner appearance="primary" label="Secondary Spinner" aria-live="polite" aria-busy="false" />`,
        `<Spinner appearance="primary" aria-label="your screen reader text" aria-live="polite" aria-busy="true" />`,
    ],
    invalid: [
        {
            code: `<Spinner />`,
            errors: [{ messageId: "noUnlabelledSpinner" }]
        },
        {
            code: `<Spinner appearance="primary" label="Primary Spinner" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }]
        },
        {
            code: `<Spinner size="large" aria-label="some text" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }]
        },
        {
            code: `<Spinner size="large" label="Large Spinner" aria-live="polite" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }]
        },
        {
            code: `<Spinner size="large" label="Large Spinner" aria-busy="true" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }]
        },
        {
            code : `<Spinner aria-label="my screen reader text" aria-live="polite" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }]
        }
    ]
});

