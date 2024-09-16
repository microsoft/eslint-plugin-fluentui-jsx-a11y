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
        `<Spinner aria-label="screen reader text"/>`,
        `<Spinner aria-label="my screen reader text" aria-live="polite"/>`,
        `<Spinner appearance="primary" label="Primary Spinner" aria-label="my screen reader text"/>`
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
            code: `<Spinner size="large" label="Large Spinner" />`,
            errors: [{ messageId: "noUnlabelledSpinner" }]
        }
    ]
});

